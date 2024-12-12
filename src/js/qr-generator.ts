import {
    ErrorCorrectionLevel,
    CharacterCapacities,
    EncodingMode,
    ModeIndicators,
    QrVersionEntry,
    CharacterCountIndicatorBitLengths,
    AlphaNumericValues
} from "./constants.js";



function getEncodingMode() : EncodingMode{
    return EncodingMode.AlphaNumeric;
}

function getSmallestPossibleVersion(
    encodingMode:EncodingMode,
    dataLength:number,
    errorCorrectionLevel:ErrorCorrectionLevel
) : QrVersionEntry {
    return CharacterCapacities.filter(entry => {
        let charCapacityComparisonResult : boolean;
        switch(encodingMode) {
            case EncodingMode.Numeric:
                charCapacityComparisonResult = dataLength <= entry.numericMode;
                break;
            case EncodingMode.AlphaNumeric:
                charCapacityComparisonResult = dataLength <= entry.alphanumericMode;
                break;
            case EncodingMode.Byte:
                charCapacityComparisonResult = dataLength <= entry.byteMode;
                break;
            case EncodingMode.Kanji:
                charCapacityComparisonResult = dataLength <= entry.kanjiMode;
                break;
        }
        return entry.errorCorrectionLevel == errorCorrectionLevel && charCapacityComparisonResult;
    }).sort((a,b) => {
        switch(encodingMode) {
            case EncodingMode.Numeric:
                return a.numericMode - b.numericMode;
            case EncodingMode.AlphaNumeric:
                return a.alphanumericMode - b.alphanumericMode;
            case EncodingMode.Byte:
                return a.byteMode - b.byteMode;
            case EncodingMode.Kanji:
                return a.kanjiMode - b.kanjiMode;
        }
    })[0];
}

function start(data:string) {
    const encodingMode = getEncodingMode();
    const errorCorrectionLevel = ErrorCorrectionLevel.L;
    const dataLength = data.length;
    const smallestPossibleVersion = getSmallestPossibleVersion(encodingMode,
																dataLength,
																errorCorrectionLevel
                                                               )!;
    console.log(smallestPossibleVersion);
    const modeIndicator = ModeIndicators.get(encodingMode)!;
    
    const charCountIndicatorVersionEntry = 
        CharacterCountIndicatorBitLengths.find( entry => {
            return smallestPossibleVersion.version >= entry.minVersion &&
            smallestPossibleVersion.version <= entry.maxVersion;
        })!;
    
    let charCountIndicatorBitLength : number;

    switch(encodingMode) {
        case EncodingMode.Numeric:
            charCountIndicatorBitLength = charCountIndicatorVersionEntry.numericMode;
            break;
        case EncodingMode.AlphaNumeric:
            charCountIndicatorBitLength = charCountIndicatorVersionEntry.alphanumericMode;
            break;
        case EncodingMode.Byte:
            charCountIndicatorBitLength = charCountIndicatorVersionEntry.byteMode;
            break;
        case EncodingMode.Kanji:
            charCountIndicatorBitLength = charCountIndicatorVersionEntry.kanjiMode;
            break;
    }

    const charCountIndicator = dataLength
                                .toString(2)
                                .padStart(charCountIndicatorBitLength,'0');
    let [encodedData,encodedBitLength] = encode(encodingMode,data);

    encodedData.unshift(charCountIndicator);
    encodedData.unshift(modeIndicator);
    encodedBitLength += charCountIndicator.length + modeIndicator.length;
    
    let dataBitsRequired = smallestPossibleVersion.totalNumberOfCodeWords! * 8;
    console.log("Databit required: ", dataBitsRequired);
    let bitLengthDifference = dataBitsRequired - encodedBitLength;

    if(bitLengthDifference > 4) {
        encodedData.push(new Array(4).fill("0").join(""));
        encodedBitLength += 4;
    } else {
        encodedData.push(new Array(bitLengthDifference).fill("0").join(""));
        encodedBitLength += bitLengthDifference;
    }

    let stringToAdd = "";
    while(encodedBitLength % 8 !== 0){
        stringToAdd += "0";
        encodedBitLength += 1;
    }

    if(stringToAdd !== "") {
        encodedData.push(stringToAdd);
    }
    
    let which = true;
    while (encodedBitLength < dataBitsRequired){
        encodedData.push(which ? "11101100" : "00010001");
        which = !which;
        encodedBitLength += 8;
    }
    console.log(encodedData);
    console.log(encodedBitLength);

    
}


function encode(encodingMode : EncodingMode, data: string) : [string[],number] {
    
    function alphaNumeric(data:string) : [string[],number] {
        // Split string into an array of tokens, where each
        // token is 2  characters of the string. The last one
        // may or may not be 2 characters in length
        const tokens = data.match(/(..?)/g)!;
        const parsedData : string[] = [];
        let bitLength = 0;
        tokens.forEach(token => {
            if(token.length == 2) {
                // Multiply the 
                parsedData.push(
                    (AlphaNumericValues.get(token[0])! * 45 + AlphaNumericValues.get(token[1])!)
                    .toString(2)
                    .padStart(11,'0')
                );
            } else {
                parsedData.push(
                    AlphaNumericValues.get(token[0])!
                    .toString(2)
                    .padStart(6,'0')
                );
            }
            bitLength += parsedData[parsedData.length - 1].length;
        });
        console.log("Tokens: ", tokens);
        console.log("Parsed Data: ",parsedData.join(' '));
        console.log("return val: ", parsedData);
        return [parsedData,bitLength];
    }

    switch(encodingMode) {
        case EncodingMode.AlphaNumeric:
        default:
            return alphaNumeric(data);
    }
}


document.querySelector('#start')?.addEventListener('click',() => {start('HELLO WORLD')});
start('HELLO WORLD');

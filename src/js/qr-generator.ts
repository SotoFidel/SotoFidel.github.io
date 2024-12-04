import { ErrorCorrectionLevel, CharacterCapacities, EncodingMode, ModeIndicators, QrVersionEntry, CharacterCountIndicatorBitLengths, AlphaNumericValues } from "./constants.js";



function getEncodingMode() {
    return EncodingMode.AlphaNumeric;
}

function getSmallestPossibleVersion(encodingMode:EncodingMode,dataLength:number,errorCorrectionLevel:ErrorCorrectionLevel) : QrVersionEntry {
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
    const smallestPossibleVersion = getSmallestPossibleVersion(encodingMode, dataLength, errorCorrectionLevel)!;
    const modeIndicator = ModeIndicators.get(encodingMode)!;
    
    const charCountIndicatorVersionEntry = CharacterCountIndicatorBitLengths.find( entry => {
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

    const charCountIndicator = dataLength.toString(2).padStart(charCountIndicatorBitLength,'0');
    console.log(charCountIndicator);
    console.log(modeIndicator);
    encode(encodingMode,data);
}


function encode(encodingMode : EncodingMode, data: string) : string {
    
    function alphaNumeric(data:string) : string {
        const tokens = data.match(/(..?)/g)!;
        const parsedData : string[] = [];
        tokens.forEach(token => {
            if(token.length == 2) {
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
        });
        console.log(tokens);
        console.log(parsedData.join(' '));
        return tokens.toString();
    }

    switch(encodingMode) {
        case EncodingMode.AlphaNumeric:
        default:
            return alphaNumeric(data);
    }
}


document.querySelector('#start')?.addEventListener('click',() => {start('HELLO WORLD')});
start('HELLO WORLD');
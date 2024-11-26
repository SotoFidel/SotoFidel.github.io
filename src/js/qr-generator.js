"use strict";
var EncodingModes;
(function (EncodingModes) {
    EncodingModes[EncodingModes["Numeric"] = 0] = "Numeric";
    EncodingModes[EncodingModes["AlphaNumeric"] = 1] = "AlphaNumeric";
    EncodingModes[EncodingModes["Byte"] = 2] = "Byte";
    EncodingModes[EncodingModes["Kanji"] = 3] = "Kanji";
})(EncodingModes || (EncodingModes = {}));
function getEncodingMode() {
    return EncodingModes.Numeric;
}

"use strict";
exports.__esModule = true;
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.isStringBuildWithNumbersOnly = function (input) {
        return input.match(/^\d+$/) !== null;
    };
    return StringHelper;
}());
exports["default"] = StringHelper;

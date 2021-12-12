"use strict";
exports.__esModule = true;
var ArrayHelper = /** @class */ (function () {
    function ArrayHelper() {
    }
    ArrayHelper.getRandomItem = function (items) {
        var index = Math.floor(Math.random() * items.length);
        return items[index];
    };
    return ArrayHelper;
}());
exports["default"] = ArrayHelper;

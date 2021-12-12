"use strict";
exports.__esModule = true;
var AuthorizationHelper = /** @class */ (function () {
    function AuthorizationHelper() {
    }
    AuthorizationHelper.hasPermission = function (guildMember, permissionResolvable) {
        return guildMember.hasPermission(permissionResolvable);
    };
    return AuthorizationHelper;
}());
exports["default"] = AuthorizationHelper;

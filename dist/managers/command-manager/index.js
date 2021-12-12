"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CommandManager = void 0;
var fs = __importStar(require("fs"));
var Discord = __importStar(require("discord.js"));
var MiscHelper_1 = __importDefault(require("../../helpers/MiscHelper"));
var constants_1 = require("../../constants");
var CommandManager = /** @class */ (function () {
    function CommandManager(client) {
        this.client = client;
        this.registerCommandHandlers();
    }
    CommandManager.prototype.registerCommandHandlers = function () {
        var _this = this;
        this.commandHandlers = fs
            .readdirSync(__dirname + "/" + CommandManager.HANDLERS_FOLDER_NAME)
            .filter(function (filename) { return filename.endsWith(".ts"); })
            .map(function (filename) {
            return __dirname + "/" + CommandManager.HANDLERS_FOLDER_NAME + "/" + filename;
        })
            .map(function (filename) { return new (require(filename)["default"])(); });
        if (this.commandHandlers.some(function (i) { return i.aliases.length === 0; })) {
            throw new Error("There is a message handler with no aliases in it");
        }
        this.commandHandlers.forEach(function (commandHandler) {
            return console.info("Loaded '" +
                commandHandler.aliases.join(", ") +
                "' argument(s) listener");
        });
        this.client.on("message", function (message) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.commandArrived(message)];
        }); }); });
    };
    CommandManager.prototype.commandArrived = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var args, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (message.author.bot)
                            return [2 /*return*/];
                        if (message.type !== "DEFAULT")
                            return [2 /*return*/];
                        args = message.content.split(" ");
                        if (args.length === 0) {
                            console.log("args.length was 0, not processing the message");
                            return [2 /*return*/];
                        }
                        command = args[0];
                        if (!command.startsWith(constants_1.COMMAND_PREFIX))
                            return [2 /*return*/];
                        command = command.substring(constants_1.COMMAND_PREFIX.length);
                        args.shift();
                        console.log("> " + message.author.username + ": " + message.content);
                        return [4 /*yield*/, this.executeCommand(message, command, args)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandManager.prototype.executeCommand = function (message, command, args) {
        return __awaiter(this, void 0, void 0, function () {
            var commandHandler, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(command === CommandManager.HELP_COMMAND)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.helpCommandArrived(message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        commandHandler = this.commandHandlers.find(function (i) { return i.aliases.indexOf(command) !== -1; });
                        if (!!commandHandler) return [3 /*break*/, 4];
                        return [4 /*yield*/, CommandManager.unknownCommandArrived(message)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        _a.trys.push([4, 6, , 8]);
                        return [4 /*yield*/, commandHandler.execute(message, args)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [4 /*yield*/, MiscHelper_1["default"].sendAndDelete(message, {
                                content: "Failed to process your request, contact to the developers if this problem persists"
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CommandManager.prototype.helpCommandArrived = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var reply, _i, _a, commandHandler, aliasesJoined;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reply = new Discord.MessageEmbed();
                        reply.setTitle("Available commands");
                        for (_i = 0, _a = this.commandHandlers; _i < _a.length; _i++) {
                            commandHandler = _a[_i];
                            aliasesJoined = commandHandler.aliases
                                .map(function (i) { return "" + constants_1.COMMAND_PREFIX + i; })
                                .join(", ");
                            reply.addField("**" + aliasesJoined + "**", commandHandler.description);
                        }
                        return [4 /*yield*/, message.reply(reply)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandManager.unknownCommandArrived = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!constants_1.ENABLE_UNKOWN_COMMAND_MESSAGE)
                            return [2 /*return*/];
                        return [4 /*yield*/, message.reply("Unknown command.\nType `" + constants_1.COMMAND_PREFIX + "help` to get the list of commands")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandManager.HANDLERS_FOLDER_NAME = "handlers";
    CommandManager.HELP_COMMAND = "help";
    return CommandManager;
}());
exports.CommandManager = CommandManager;

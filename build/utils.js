"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.saveData = void 0;
const fs_1 = __importDefault(require("fs"));
// saving data functions
function saveData(data, file) {
    const stringifyData = JSON.stringify(data);
    fs_1.default.writeFileSync(require("path").resolve(__dirname, `./data/${file}.json`), stringifyData);
    return "Data saved!";
}
exports.saveData = saveData;
// fetching data functions
function getData(file) {
    const jsonData = fs_1.default.readFileSync(require("path").resolve(__dirname, `./data/${file}.json`));
    return JSON.parse(jsonData);
}
exports.getData = getData;
exports.utils = { saveData, getData };

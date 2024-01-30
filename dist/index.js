"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("./utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { directory, number: numberOfMostFrequentlyOccurringWords } = (0, utils_1.getArgs)();
        const directoryPath = (0, path_1.join)(__dirname, directory);
        const textFromDirectoryFiles = yield (0, utils_1.processTextFromFiles)(directoryPath);
        const wordAnalysisResult = (0, utils_1.wordCounter)(textFromDirectoryFiles, +numberOfMostFrequentlyOccurringWords);
        (0, utils_1.formatAndPrintReport)(wordAnalysisResult);
    }
    catch (e) {
        console.log(e);
    }
}))();

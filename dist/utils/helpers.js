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
exports.processTextFromFiles = exports.getArgs = exports.wordCounter = exports.formatAndPrintReport = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const constants_1 = require("./constants");
const formatAndPrintReport = (wordCountObject) => {
    let count = 0;
    for (const [key, value] of Object.entries(wordCountObject)) {
        count++;
        console.log(`${count}. ${key}: ${value}`);
    }
};
exports.formatAndPrintReport = formatAndPrintReport;
const getArgs = () => {
    const args = process.argv;
    if (!args[2] || !args[3])
        throw Error('You must enter a path and number command line arguments to run this app.');
    const directory = args[2];
    const number = args[3];
    return { directory, number };
};
exports.getArgs = getArgs;
const processTextFromFiles = (directoryPath) => __awaiter(void 0, void 0, void 0, function* () {
    let concatenatedString = '';
    const files = yield (0, promises_1.readdir)(directoryPath, { encoding: 'utf-8' });
    for (const file of files) {
        let filePath = (0, path_1.join)(directoryPath, file);
        const text = yield (0, promises_1.readFile)(filePath, { encoding: 'utf-8' });
        concatenatedString += `${text} `;
    }
    return concatenatedString;
});
exports.processTextFromFiles = processTextFromFiles;
const removeCommonWords = (wordsMatchedArray) => wordsMatchedArray === null || wordsMatchedArray === void 0 ? void 0 : wordsMatchedArray.filter((wordMatched) => constants_1.commonWords.every((commonWord) => !wordMatched.toLowerCase().includes(commonWord)));
const removewordsWithNonAlphabeticCharacters = (wordsMatched) => wordsMatched === null || wordsMatched === void 0 ? void 0 : wordsMatched.filter((word) => word.match(/^[a-zA-Z]+$/));
const removedWordsWithLessThanThreeCharacters = (wordsMatched) => wordsMatched === null || wordsMatched === void 0 ? void 0 : wordsMatched.filter((word) => word.length >= 3);
const wordCounter = (words, numberOfWords) => {
    const initialWordsProcessed = words.match(/\w+/g);
    if (!initialWordsProcessed)
        throw Error('No words retrieved from text files');
    const wordsProcessedWithoutCommonWords = removeCommonWords(initialWordsProcessed);
    const wordsProcessedWithoutNonAlphaCharacters = removewordsWithNonAlphabeticCharacters(wordsProcessedWithoutCommonWords);
    const wordsProcessedWithMoreThanThreeCharacters = removedWordsWithLessThanThreeCharacters(wordsProcessedWithoutNonAlphaCharacters);
    let occurrences = {};
    for (let wordProcessed of wordsProcessedWithMoreThanThreeCharacters) {
        if (occurrences[wordProcessed] && wordProcessed.length > 1)
            occurrences[wordProcessed]++;
        else
            occurrences[wordProcessed] = 1;
    }
    let topWordsCollection = [];
    for (let actualWord in occurrences) {
        topWordsCollection.push([actualWord, occurrences[actualWord]]);
    }
    let topWordsObject = {};
    topWordsCollection
        .sort((a, b) => b[1] - a[1])
        .splice(0, numberOfWords)
        .reverse()
        .forEach((item) => {
        topWordsObject[item[0]] = item[1];
    });
    return topWordsObject;
};
exports.wordCounter = wordCounter;

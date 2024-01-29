/** @format */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { TopWordsObject, Occurrences, SortedWords } from '../types';
import { commonWords } from './constants';

const formatAndPrintReport = (wordCountObject: TopWordsObject) => {
  let count = 0;

  for (const [key, value] of Object.entries(wordCountObject)) {
    count++;
    console.log(`${count}. ${key}: ${value}`);
  }
};

const getArgs = () => {
  const args = process.argv;

  if (!args[2] || !args[3]) throw Error('You must enter a path and number command line arguments to run this app.');

  const directory = args[2];
  const number = args[3];

  return { directory, number };
};

const processTextFromFiles = async (directoryPath: string) => {
  let concatenatedString = '';

  const files = await readdir(directoryPath, { encoding: 'utf-8' });

  for (const file of files) {
    let filePath = join(directoryPath, file);
    const text = await readFile(filePath, { encoding: 'utf-8' });
    concatenatedString += `${text} `;
  }

  return concatenatedString;
};

const removeCommonWords = (wordsMatchedArray: RegExpMatchArray | null) =>
  wordsMatchedArray?.filter((wordMatched) => commonWords.every((commonWord) => !wordMatched.toLowerCase().includes(commonWord)));

const removeWordsWithNonAlphabeticCharacters = (wordsMatched: string[] | undefined) => wordsMatched?.filter((word) => word.match(/^[a-zA-Z]+$/));

const removedWordsWithLessThanThreeCharacters = (wordsMatched: string[] | undefined) => wordsMatched?.filter((word) => word.length >= 3);

const wordCounter = (words: string, numberOfWords: number) => {
  const initialWordsProcessed = words.match(/\w+/g);

  if (!initialWordsProcessed) throw Error('No words retrieved from text files');

  const wordsProcessedWithoutCommonWords = removeCommonWords(initialWordsProcessed);

  const wordsProcessedWithoutNonAlphaCharacters = removeWordsWithNonAlphabeticCharacters(wordsProcessedWithoutCommonWords);

  const wordsProcessedWithMoreThanThreeCharacters = removedWordsWithLessThanThreeCharacters(wordsProcessedWithoutNonAlphaCharacters);

  let occurrences: Occurrences = {};

  for (let wordProcessed of wordsProcessedWithMoreThanThreeCharacters!) {
    if (occurrences[wordProcessed] && wordProcessed.length > 1) occurrences[wordProcessed]++;
    else occurrences[wordProcessed] = 1;
  }

  let topWordsCollection: SortedWords = [];
  for (let actualWord in occurrences) {
    topWordsCollection.push([actualWord, occurrences[actualWord]]);
  }

  let topWordsObject: TopWordsObject = {};

  topWordsCollection
    .sort((a: (string | number)[], b: (string | number)[]) => (b[1] as number) - (a[1] as number))
    .splice(0, numberOfWords)
    .reverse()
    .forEach((item) => {
      topWordsObject[item[0]] = item[1];
    });

  return topWordsObject;
};

export { formatAndPrintReport, wordCounter, getArgs, processTextFromFiles };

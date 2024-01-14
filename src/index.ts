/** @format */

import { join } from 'path';
import { formatAndPrintReport, getArgs, wordCounter, processTextFromFiles } from './utils';

(async () => {
  try {
    const { directory, number: numberOfMostFrequentlyOccurringWords } = getArgs();

    const directoryPath = join(__dirname, directory);

    const textFromDirectoryFiles = await processTextFromFiles(directoryPath);

    const wordAanalysisResult = wordCounter(textFromDirectoryFiles, +numberOfMostFrequentlyOccurringWords);

    formatAndPrintReport(wordAanalysisResult);
  } catch (e) {
    console.log(e);
  }
})();

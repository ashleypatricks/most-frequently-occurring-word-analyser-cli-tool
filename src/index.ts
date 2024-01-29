/** @format */

import { join } from 'path';
import { formatAndPrintReport, getArgs, wordCounter, processTextFromFiles } from './utils';

(async () => {
  try {
    const { directory, number: numberOfMostFrequentlyOccurringWords } = getArgs();

    const directoryPath = join(__dirname, directory);

    const textFromDirectoryFiles = await processTextFromFiles(directoryPath);

    const wordAnalysisResult = wordCounter(textFromDirectoryFiles, +numberOfMostFrequentlyOccurringWords);

    formatAndPrintReport(wordAnalysisResult);
  } catch (e) {
    console.log(e);
  }
})();

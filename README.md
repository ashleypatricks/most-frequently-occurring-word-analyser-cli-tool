<!-- @format -->

# Most Frequently Occurring Word Analyser CLI Tool

Command-line tool that can analyze a directory of text files and produce a report of the most frequently occurring words in the files.

The tool ignores:

- Common English words like "the", "and", "of", etc.
- Words that contain non-alphabetic characters.
- Words that are less than three characters long.

## Install Dependencies

`npm install`

## Run The App

You can place any .text files that you want to analyze within the `dist/text-files` directory.

In the project directory, you can run:

`npm run start:app text-files <number>`

The report will be printed in the console in the following format:

`Top <number> words in <directory>`:

`1. <word>: <count>`

`2. <word>: <count>`

`3. <word>: <count>`

...

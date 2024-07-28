#!/usr/bin/env node

const yargs = require('yargs');
const mergeCodeFiles = require('./index');

const argv = yargs
    .option('inputDir', {
        alias: 'i',
        description: 'Directory containing the code files to merge',
        type: 'string',
        demandOption: true
    })
    .option('outputFile', {
        alias: 'o',
        description: 'Name of the output markdown file',
        type: 'string',
        demandOption: true
    })
    .option('fileExtensions', {
        alias: 'e',
        description: 'File extensions to include in the merge',
        type: 'array',
        default: []
    })
    .option('includeFileNames', {
        alias: 'f',
        description: 'Include file names as headers in the merged markdown file',
        type: 'boolean',
        default: true
    })
    .option('headerLevel', {
        alias: 'h',
        description: 'Markdown header level to use for file names',
        type: 'number',
        default: 2
    })
    .option('recursive', {
        alias: 'r',
        description: 'Merge files from subdirectories recursively',
        type: 'boolean',
        default: false
    })
    .option('excludePatterns', {
        alias: 'x',
        description: 'Patterns of file names or directories to exclude from the merge',
        type: 'array',
        default: []
    })
    .help()
    .alias('help', 'H')
    .argv;

mergeCodeFiles({
    inputDir: argv.inputDir,
    outputFile: argv.outputFile,
    fileExtensions: argv.fileExtensions,
    includeFileNames: argv.includeFileNames,
    headerLevel: argv.headerLevel,
    recursive: argv.recursive,
    excludePatterns: argv.excludePatterns
});

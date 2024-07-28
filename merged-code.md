## index.js

```js
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function mergeCodeFiles({
                                  inputDir,
                                  outputFile,
                                  fileExtensions = [],
                                  includeFileNames = true,
                                  headerLevel = 2,
                                  recursive = false,
                                  excludePatterns = []
                              }) {
    // Validate parameters
    if (!inputDir || !outputFile) {
        throw new Error('inputDir and outputFile are required parameters.');
    }

    // Build glob pattern
    const extensionPattern = fileExtensions.length > 0 ? `*.+(${fileExtensions.join('|')})` : '*';
    const recursivePattern = recursive ? '/**/' : '/';
    const globPattern = path.join(inputDir, recursivePattern, extensionPattern);

    // Get list of files
    const files = glob.sync(globPattern, {
        ignore: excludePatterns
    });

    // Merge files content
    let mergedContent = '';

    for (const file of files) {
        const fileContent = await fs.readFile(file, 'utf-8');
        const fileExtension = path.extname(file).substring(1); // Get file extension without the dot
        if (includeFileNames) {
            const header = '#'.repeat(headerLevel) + ' ' + path.relative(inputDir, file);
            mergedContent += `${header}\n\n\`\`\`${fileExtension}\n${fileContent}\n\`\`\`\n\n`;
        } else {
            mergedContent += `\`\`\`${fileExtension}\n${fileContent}\n\`\`\`\n\n`;
        }
    }

    // Write to output file
    await fs.outputFile(outputFile, mergedContent);
    console.log(`Merged content written to ${outputFile}`);
}

module.exports = mergeCodeFiles;

```

## cli.js

```js
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

```


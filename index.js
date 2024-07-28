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

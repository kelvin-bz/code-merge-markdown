import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

interface MergeCodeFilesOptions {
    inputDir: string;
    outputFile: string;
    fileExtensions?: string[];
    includeFileNames?: boolean;
    headerLevel?: number;
    recursive?: boolean;
    excludePatterns?: string[];
}

export async function mergeCodeFiles({
                                         inputDir,
                                         outputFile,
                                         fileExtensions = [],
                                         includeFileNames = true,
                                         headerLevel = 2,
                                         recursive = false,
                                         excludePatterns = []
                                     }: MergeCodeFilesOptions): Promise<void> {
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
        if (includeFileNames) {
            const header = '#'.repeat(headerLevel) + ' ' + path.relative(inputDir, file);
            mergedContent += `${header}\n\n${fileContent}\n\n`;
        } else {
            mergedContent += `${fileContent}\n\n`;
        }
    }

    // Write to output file
    await fs.outputFile(outputFile, mergedContent);
    console.log(`Merged content written to ${outputFile}`);
}

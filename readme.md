
# code-merge-markdown

`code-merge-markdown` is a simple Node.js tool for merging code files from a specified directory into a single markdown file. Each code file is wrapped in a markdown code block, with an appropriate language identifier based on the file extension.

## Features

- Merge code files from a directory into a single markdown file
- Supports filtering by file extensions
- Option to include file names as headers in the merged markdown file
- Recursive directory traversal
- Exclude specific files or directories

## Installation

To install `code-merge-markdown`, you need to have Node.js and npm installed. You can install the package globally using npm:

```sh
npm install -g code-merge-markdown
```

## Usage

To use `code-merge-markdown`, you can run it from the command line with the following options:

```sh
code-merge-markdown -i <inputDir> -o <outputFile> [options]
```

### Options

- `-i, --inputDir <inputDir>`: Directory containing the code files to merge (required)
- `-o, --outputFile <outputFile>`: Name of the output markdown file (required)
- `-e, --fileExtensions <extensions>`: File extensions to include in the merge (default: all files)
- `-f, --includeFileNames`: Include file names as headers in the merged markdown file (default: true)
- `-h, --headerLevel <level>`: Markdown header level to use for file names (default: 2)
- `-r, --recursive`: Merge files from subdirectories recursively (default: false)
- `-x, --excludePatterns <patterns>`: Patterns of file names or directories to exclude from the merge (default: none)

### Example

To merge all `.js` and `.ts` files from the `src` directory and its subdirectories into a markdown file named `merged-code.md`:

```sh
code-merge-markdown -i ./src -o ./merged-code.md -e js ts -r
```

### Example Output



For example if you have the following files:

```bash
src/test
├── file1.ts
├── file2.js
└── parent
    ├── file3.ts
    └── file4.js
```

The output will be:

```markdown
## file2.js
console.log('Hello from file2.js');

## file1.ts
console.log('Hello from file1.ts');

## parent/file4.js
console.log('Hello from file4.js');

## parent/file3.ts
console.log('Hello from file3.ts');

```


## License

This project is licensed under the MIT License.

Feel free to adjust any sections to better fit your project's specifics, such as the repository URL in the development section.

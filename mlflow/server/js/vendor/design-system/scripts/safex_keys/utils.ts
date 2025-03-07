import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

const srcDirectory = path.resolve(__dirname, '../../src');

function getAllFiles(directory: string, files: string[] = []) {
  const subFiles = readdirSync(directory);
  subFiles.forEach((file: string) => {
    const subFilePath = path.join(directory, file);
    const stats = statSync(subFilePath);
    if (stats.isFile()) {
      files.push(subFilePath);
    } else if (stats.isDirectory()) {
      getAllFiles(subFilePath, files);
    }
  });
  return files;
}

// This crawls our code for just our `safex` flags, so that we can make a list of them to
// power a storybook menu to toggle them on/off.
export function generateSafexKeysFileContent() {
  const files = getAllFiles(srcDirectory);

  const safexKeys = new Set<string>();

  files.forEach((file: string) => {
    if (file.match(/\.test\.(ts|tsx)$/)) {
      // Skip test files
      return;
    }
    const fileContent = readFileSync(file, 'utf-8');
    const regex = /safex\(['"`]([\w.]+)['"`].*?\)/g;
    let match;
    while ((match = regex.exec(fileContent))) {
      safexKeys.add(match[1]);
    }
  });

  const safexKeysFileContent = `
// This file is auto-generated by \`yarn storybook:generate-safex-index\`.
const keys: string[] = ${JSON.stringify(Array.from(safexKeys), null, 2)};

export default keys;
`;

  return safexKeysFileContent;
}

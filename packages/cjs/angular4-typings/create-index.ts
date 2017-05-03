import fs = require('fs');
import path = require('path');

export function createIndex (missingIndexDirectory: string, packageDirectory: string) {
    const dir = fs.readdirSync(missingIndexDirectory);

    const relativePath = path.relative(packageDirectory, missingIndexDirectory);
    const exportsLinesTemp = dir.filter((f) => fs.statSync(path.join(missingIndexDirectory, f)).isFile())
        .map((f) => `export * from './${path.basename(f, '.d.ts')}'`);
    const exportsLinesFinal = dir.filter((f) => fs.statSync(path.join(missingIndexDirectory, f)).isFile())
        .map((f) => `export * from '@angular/core/${relativePath}/${path.basename(f, '.d.ts')}'`);

    fs.writeFileSync(path.join(missingIndexDirectory, 'index.d.ts'), exportsLinesTemp.join('\n'));
    console.log(JSON.stringify({ temp: exportsLinesTemp, final: exportsLinesFinal}, null, '\t'));
    return { temp: exportsLinesTemp, final: exportsLinesFinal};
}



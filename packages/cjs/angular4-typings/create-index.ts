import fs = require('fs');
import path = require('path');

export function createIndex (missingIndexDirectory: string, packageDirectory: string) {
    const dir = fs.readdirSync(missingIndexDirectory);

    const relativePath = path.relative(packageDirectory, missingIndexDirectory);
    const exportsLinesTemp = dir.filter((f) => fs.statSync(path.join(missingIndexDirectory, f)).isFile())
        .map((f) => `export * from './${path.basename(missingIndexDirectory)}/${path.basename(f, '.d.ts')}'`);
    const exportsLinesFinal = dir.filter((f) => fs.statSync(path.join(missingIndexDirectory, f)).isFile())
        .map((f) => `export * from '@angular/core/${relativePath}/${path.basename(f, '.d.ts')}'`);

    return { temp: exportsLinesTemp, final: exportsLinesFinal};
}



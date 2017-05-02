import fs = require('fs');
import path = require('path');

export function createIndex (missingIndexDirectory) {
    let dir = fs.readdirSync(missingIndexDirectory);

    var exportsLines = dir.filter((f) => fs.statSync(path.join(missingIndexDirectory, f)).isFile())
        .map((f) => `export * from './${path.basename(f, '.d.ts')}'`);

    fs.writeFileSync(path.join(missingIndexDirectory, 'index.d.ts'), exportsLines.join('\n'));
}


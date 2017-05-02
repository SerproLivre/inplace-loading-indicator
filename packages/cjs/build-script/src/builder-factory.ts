import shelljs = require('shelljs');

import { Builder } from "./builder-base";
import { CjsTypescriptBuilder } from "./cjs-typescript-builder";
import { UmdTypescriptBuilder } from "./umd-typescript-builder";

export class BuilderFactory {

    static getInstanceFor(type: string): Builder {
        const projectAbsolutePath = BuilderFactory.getProjectRoot();

        if (type === 'umd') {
            return new UmdTypescriptBuilder(projectAbsolutePath);
        } else {
            return new CjsTypescriptBuilder(projectAbsolutePath);
        }
    }

    private static getProjectRoot() {
        let projectRoot = shelljs.exec('npm prefix').stdout.split('\n')[0]
        shelljs.echo('Project Root: ', projectRoot);
        return projectRoot;
    }
}
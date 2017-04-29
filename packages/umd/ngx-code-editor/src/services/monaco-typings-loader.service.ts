import { Injectable } from '@angular/core';

/**
 * Loads typings into monaco editor
 *
 * - https://github.com/Microsoft/monaco-editor/issues/264
 *
 *
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ["node_modules/@types"]
});

// extra libraries
monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `export declare function next() : string`,
    'node_modules/@types/external/index.d.ts');

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
})

var jsCode = `import * as x from "external"
    const tt : string = x.dnext();`;

monaco.editor.create(document.getElementById("container"), {
    model: monaco.editor.createModel(jsCode,"typescript",new monaco.Uri("file:///main.tsx")),
});
 *
 * @export
 * @class MonacoTypingsLoader
 */
@Injectable()
export class MonacoTypingsLoader {
  typings: monaco.IDisposable[] = [];
  constructor() {
  }

  loadTypings() {
      // monaco.languages.typescript.typescriptDefaults.addExtraLib(this.angularCore, '@types/angular/core/index.d.ts');
      monaco.languages.typescript.typescriptDefaults.addExtraLib(this.angularIndex, 'node_modules/@angular/core/index.ts');
  }


  get angularCore() {
    return `
declare var module: any;

declare module "@angular/core" {

    export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }
}`;
  }


  get angularIndex() {
    return `
    export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }`;
  }
}

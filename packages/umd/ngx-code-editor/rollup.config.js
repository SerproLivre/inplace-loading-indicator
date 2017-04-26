export default {
    entry: './dist/modules/pratico.ngx-code-editor.es5.js',
    dest: './dist/bundles/pratico.ngx-code-editor.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'pratico.ngx-code-editor',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}
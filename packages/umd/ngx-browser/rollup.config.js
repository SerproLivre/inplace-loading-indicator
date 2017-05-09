export default {
    entry: './dist/modules/pratico.ngx-browser.es5.js',
    dest: './dist/bundles/pratico.ngx-browser.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'pratico.ngx-browser',
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
        'rxjs/Observer': 'Rx',
    },
    onwarn: () => { return }
}

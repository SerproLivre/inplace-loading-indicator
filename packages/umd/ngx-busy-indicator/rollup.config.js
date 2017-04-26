export default {
    entry: './dist/modules/pratico.ngx-busy-indicator.es5.js',
    dest: './dist/bundles/pratico.ngx-busy-indicator.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'pratico.ngx-busy-indicator',
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
export default {
    entry: './dist/modules/pratico.ngx-svg-spinner.es5.js',
    dest: './dist/bundles/pratico.ngx-svg-spinner.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'pratico.ngx-svg-spinner',
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
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageAssetsLoader } from '../services/image-assets-loader.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { svgAsEmbededResource } from '../../helpers/svg-as-embeded-resource';

/**
 * SvgSpinnerComponent shows a svg spinner passing the name of the spinner or the svg spinner
 * into the input "spinner"
 *
 * @export
 * @class SvgSpinnerComponent
 */
@Component({
  selector: 'pratico-spinner',
  template: `<img [src]="svgEmbeddableContent" [width]="width" [height]="height">`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgSpinnerComponent {

  private _spinner: string;
  private _height = 0;
  private _width = 0;

  @Input()
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    // TODO: validate dimension  using parseCssDimension -- // require('parse-css-dimension');
    // AND https://www.npmjs.com/package/parse-absolute-css-unit to parse units to pixel
    this._width = value;
    this.ref.markForCheck();
  }

  @Input()
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
    this.ref.markForCheck();
  }

  /**
   * Returns the svg already encoded, prefixed and sanitized to use inside "src" attribute of an image tag
   *
   * @readonly
   * @type {SafeResourceUrl}
   * @memberOf SpinnerComponent
   */
  get svgEmbeddableContent(): SafeResourceUrl {
    return this.getSvgEmbeddableContent();
  }

  /**
   *
   *
   * @returns {SafeResourceUrl}
   *
   * @memberOf SvgSpinnerComponent
   */
  getSvgEmbeddableContent(): SafeResourceUrl {
    if (this.isSvgKeyName(this.spinner)) {
      return this.sanitizeAndEncodeImageUrl(this.assets.getAssetByName(this.spinner));
    } else {
      return this.sanitizeAndEncodeImageUrl(this.spinner);
    }
  }


  @Input()
  get spinner() {
    return this._spinner;
  }

  set spinner(value: string) {
    this._spinner = value;
    this.ref.markForCheck();
  }

  /**
   * Creates an instance of SpinnerComponent.
   * @param {ImageAssetsLoader} assets
   * @param {DomSanitizer} sanitizer
   *
   * @memberOf SpinnerComponent
   */
  constructor(protected assets: ImageAssetsLoader, protected sanitizer: DomSanitizer, protected ref: ChangeDetectorRef) {
  }

  private isSvgKeyName(value: string) {
    return this.assets.hasAsset(value);
  }

  private sanitizeAndEncodeImageUrl(content: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `${svgAsEmbededResource(content)}`
    );
  }
}

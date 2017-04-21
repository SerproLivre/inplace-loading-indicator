import { Injectable } from '@angular/core';

import { svgAsEmbededResource } from '../../helpers/svg-as-embeded-resource';

export interface NgxsAssetsResourcesUrls {
  [name: string]: string;
}

import {
  BALL_SVG,
  BALLS_SVG,
  BLUE_LOADING,
  CLOCK_SVG,
  HOUR_GLASS_SVG,
  MAGNIFY_SVG,
  ORANGE_LOADING_SVG,
  ROLLING_SVG,
  SQUARES_SVG
} from '../../assets/icons/svg-icons';

export const EMBEDDED_IMAGE_RESOURCES: NgxsAssetsResourcesUrls = {
  'ball': BALL_SVG,
  'balls': BALLS_SVG,
  'blue-loading': BLUE_LOADING,
  'clock': CLOCK_SVG,
  'hour-glass': HOUR_GLASS_SVG,
  'magnify': MAGNIFY_SVG,
  'orange-loading': ORANGE_LOADING_SVG,
  'rolling': ROLLING_SVG,
  'squares': SQUARES_SVG
};

Object.keys(EMBEDDED_IMAGE_RESOURCES).forEach((name) => {
  EMBEDDED_IMAGE_RESOURCES[name] = svgAsEmbededResource(EMBEDDED_IMAGE_RESOURCES[name]);
});


export const DefaultLoadingImage = 'blue-loading';

/**
 * ImageAssetsLoader provides the icons which would be used in the loading indicator.
 *
 * @export
 * @class ImageAssetsLoader
 */
@Injectable()
export class ImageAssetsLoader {

  private resources: NgxsAssetsResourcesUrls = EMBEDDED_IMAGE_RESOURCES;

  /**
   * Creates an instance of ImageAssetsLoader.
   *
   * @memberOf ImageAssetsLoader
   */
  constructor() {
  }

  /**
   * Returns an icon asset by name
   *
   * @param {string} name
   * @returns {string} the asset resource src or data
   *
   * @memberOf ImageAssetsLoader
   */
  getAssetByName(name: string): string {
    return this.resources[name];
  }

  /**
   * Returns true if there is an asset with a given name
   *
   * @param {string} name
   * @returns {boolean}
   *
   * @memberOf ImageAssetsLoader
   */
  hasAsset(name: string): boolean {
    return Object.keys(this.resources).indexOf(name) !== -1;
  }

  /**
   *
   *
   * @returns {string} the default asset resource src or data
   *
   * @memberOf ImageAssetsLoader
   */
  getDefaultAsset(): string {
    return this.resources[DefaultLoadingImage];
  }

}

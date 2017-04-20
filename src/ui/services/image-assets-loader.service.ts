import { Injectable } from '@angular/core';

import { svgAsEmbededResource } from '../../helpers/svg-as-embeded-resource';

export interface NgxsAssetsResourcesUrls {
  [name: string]: string;
}

let EMBEDDED_IMAGE_RESOURCES: NgxsAssetsResourcesUrls = {};

if (process && process.env && process.env.NODE_ENV === 'test') {
  EMBEDDED_IMAGE_RESOURCES = {
    'ball': '../icons/ball.svg',
    'balls': '../icons/balls.svg',
    'blue-loading': '../icons/blue-loading.svg',
    'clock': '../icons/clock.svg',
    'hour-glass': '../icons/hour-glass.svg',
    'magnify': '../icons/magnify.svg',
    'orange-loading': '../icons/hour-glass.svg',
    'rolling': '../icons/rolling.svg',
    'squares': '../icons/squares.svg'
  };
} else {
  EMBEDDED_IMAGE_RESOURCES = {
    'ball': require('../../../assets/icons/ball.svg'),
    'balls': require('../../../assets/icons/balls.svg'),
    'blue-loading': require('../../../assets/icons/blue-loading.svg'),
    'clock': require('../../../assets/icons/clock.svg'),
    'hour-glass': require('../../../assets/icons/hour-glass.svg'),
    'magnify': require('../../../assets/icons/magnify.svg'),
    'orange-loading': require('../../../assets/icons/hour-glass.svg'),
    'rolling': require('../../../assets/icons/rolling.svg'),
    'squares': require('../../../assets/icons/squares.svg')
  };
}
Object.keys(EMBEDDED_IMAGE_RESOURCES).forEach((name) => {
  EMBEDDED_IMAGE_RESOURCES[name] = svgAsEmbededResource(EMBEDDED_IMAGE_RESOURCES[name]);
});


export const DefaultLoadingImage = 'blue-loading';

@Injectable()
export class ImageAssetsLoader {

  private resources: NgxsAssetsResourcesUrls = EMBEDDED_IMAGE_RESOURCES;

  constructor() {
  }

  getAssetByName(name: string) {
    return this.resources[name];
  }

  getDefaultAsset() {
    return this.resources[DefaultLoadingImage];
  }

}

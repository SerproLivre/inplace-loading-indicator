import { Injectable } from "@angular/core";

import { svgAsEmbededResource } from '../helpers/svg-as-embeded-resource';

export interface AssetsResourcesUrls {
    [name: string]: string;
}


const EMBEDDED_IMAGE_RESOURCES: AssetsResourcesUrls = {
    'ball': require('../icons/ball.svg'),
    'balls': require('../icons/balls.svg'),
    'blue-loading': require('../icons/blue-loading.svg'),
    'clock': require('../icons/clock.svg'),
    'hour-glass': require('../icons/hour-glass.svg'),
    'magnify': require('../icons/magnify.svg'),
    'orange-loading': require('../icons/hour-glass.svg'),
    'rolling': require('../icons/rolling.svg'),
    'squares': require('../icons/squares.svg')
};

Object.keys(EMBEDDED_IMAGE_RESOURCES).forEach((name) => {
    EMBEDDED_IMAGE_RESOURCES[name] = svgAsEmbededResource(EMBEDDED_IMAGE_RESOURCES[name]);
})


export const DefaultLoadingImage = 'blue-loading';

@Injectable()
export class ImageAssetsLoader {

    private resources: AssetsResourcesUrls = EMBEDDED_IMAGE_RESOURCES;

    constructor() {
    }

    getAssetByName(name: string) {
        return this.resources[name];
    }

    getDefaultAsset() {
        return this.resources[DefaultLoadingImage];
    }

}
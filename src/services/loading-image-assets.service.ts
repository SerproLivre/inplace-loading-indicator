import { Injectable } from "@angular/core";

import { svgAsEmbededResource } from '../helpers/svg-as-embeded-resource';

export interface AssetsResourcesUrls {
    [name: string]: string;
}


const EMDEDED_IAMGE_RESOURCES: AssetsResourcesUrls = {
    'ball': require('./icons/ball.svg'),
    'balls': require('./icons/balls.svg'),
    'blue-loading': require('./icons/blue-loading.svg'),
    'clock': require('./icons/clock.svg'),
    'hour-glass': require('./icons/hour-glass.svg'),
    'magnify': require('./icons/magnify.svg'),
    'orange-loading': require('./icons/hour-glass.svg'),
    'rolling': require('./icons/rolling.svg'),
    'squares': require('./icons/squares.svg')
};

Object.keys(EMDEDED_IAMGE_RESOURCES).forEach((name) => {
    EMDEDED_IAMGE_RESOURCES[name] = svgAsEmbededResource(EMDEDED_IAMGE_RESOURCES[name]);
})


export const DefaultLoadingImage = 'blue-loading';

@Injectable()
export class LoadingImageAssets {

    private resources: AssetsResourcesUrls = EMDEDED_IAMGE_RESOURCES;

    constructor() {
    }

    getAssetByName(name: string) {
        return this.resources[name];
    }

    getDefaultAsset() {
        return this.resources[DefaultLoadingImage];
    }

}
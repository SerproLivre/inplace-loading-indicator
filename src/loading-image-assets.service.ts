import { Injectable } from "@angular/core";


export interface AssetsResourcesUrls {
    [name: string]: string;
}


export const DefaultLoadingImage = 'blue-loading';

@Injectable()
export class LoadingImageAssets {

    private resources: AssetsResourcesUrls = {
        'ball': require('./icons/ball.svg'),
        'balls': require('./icons/balls.svg'),
        'blue-loading': require('./icons/blue-loading.svg'),
        'clock': require('./icons/clock.svg'),
        // 'dots': require('./icons/dots.gif'),
        'hour-glass': require('./icons/hour-glass.svg'),
        'magnify': require('./icons/magnify.svg'),
        'orange-loading': require('./icons/hour-glass.svg'),
        'rolling': require('./icons/rolling.svg'),
        'squares': require('./icons/squares.svg')
    };

    constructor() {

    }

    getAssetByName(name: string) {
        return this.resources[name];
    }

    getDefaultAsset() {
        return this.resources[DefaultLoadingImage];
    }

}
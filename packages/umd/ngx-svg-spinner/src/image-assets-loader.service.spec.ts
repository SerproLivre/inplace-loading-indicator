
import { ImageAssetsLoader } from './image-assets-loader.service';

describe(ImageAssetsLoader.name, () => {

  let imageAssetsLoader: ImageAssetsLoader;

  beforeEach(() => {
    imageAssetsLoader = new ImageAssetsLoader();
  });

  it('returns the embedded image by name', () => {
    expect(imageAssetsLoader.getAssetByName('ball')).toBeDefined();
  });

});


import { svgAsEmbededResource } from './svg-as-embeded-resource';

describe('svgAsEmbeddedResource', () => {
    it('does nothing', () => {
        expect(svgAsEmbededResource('bllblblblb')).toContain('data:image/svg+xml;charset=utf-8,bllblblblb');
    });
});

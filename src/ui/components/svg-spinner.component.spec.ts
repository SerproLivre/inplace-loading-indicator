import { SvgSpinnerComponent } from './svg-spinner.component';
import { runUnitTests, runIntegrationTests } from '../../../test/helpers';
import { ImageAssetsLoader } from '../services/image-assets-loader.service';
import { ImageAssetsLoaderMock } from '../../../test/mocks/image-assets-loader.mock';
import { DomSanitizerMock } from '../../../test/mocks/dom-sanitizer.mock';
import { DomSanitizer, By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectorRefMock } from '../../../test/mocks/change-detector-ref.mock';
import { BALL_SVG } from '../../assets/icons/svg-icons';


describe(SvgSpinnerComponent.name, () => {

  let component: SvgSpinnerComponent;
  let imageAssetsLoader: ImageAssetsLoader;
  let sanitizer: DomSanitizer;
  let changeDetectorRefMock: ChangeDetectorRef;

  beforeEach(() => {
    imageAssetsLoader = <ImageAssetsLoader>new ImageAssetsLoaderMock();
    sanitizer = <DomSanitizer>new DomSanitizerMock();
    changeDetectorRefMock = <ChangeDetectorRef>new ChangeDetectorRefMock();
  });
  describe('UnitTests', runUnitTests(() => {

    beforeEach(() => {
      component = new SvgSpinnerComponent(imageAssetsLoader, sanitizer, changeDetectorRefMock);
    });

    describe('#svgEmbeddableContent', () => {

      it('gets asset content from imageAssetsLoader', () => {
        imageAssetsLoader.getAssetByName = jasmine.createSpy('getAssetByName').and.returnValue('svg-content');
        imageAssetsLoader.hasAsset = jasmine.createSpy('getAssetByName').and.returnValue(true);
        component.getSvgEmbeddableContent();
        expect(imageAssetsLoader.getAssetByName).toHaveBeenCalled();
      });


      it('sanitize content', () => {
        imageAssetsLoader.getAssetByName = jasmine.createSpy('getAssetByName').and.returnValue('svg-content');
        imageAssetsLoader.hasAsset = jasmine.createSpy('hasAsset').and.returnValue(true);
        sanitizer.bypassSecurityTrustResourceUrl = jasmine.createSpy('');
        component.getSvgEmbeddableContent();
        expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
      });

      it('assume spinnner value if there is no asset matching by the value passed', () => {
        component.spinner = 'some-custom-svg-content';
        imageAssetsLoader.getAssetByName = jasmine.createSpy('getAssetByName');
        imageAssetsLoader.hasAsset = jasmine.createSpy('hasAsset').and.returnValue(false);
        sanitizer.bypassSecurityTrustResourceUrl = jasmine.createSpy('').and.callFake((content) => content);
        expect(imageAssetsLoader.getAssetByName).not.toHaveBeenCalled();
        expect(component.getSvgEmbeddableContent()).toEqual('data:image/svg+xml;charset=utf-8,some-custom-svg-content');
      });
    });
  }));

  describe('Integration Tests', runIntegrationTests(() => {
    let fixture: ComponentFixture<SvgSpinnerComponent> = null;
    beforeEach(async(() => {
      imageAssetsLoader.getAssetByName = jasmine.createSpy('getAssetByName').and.returnValue('svg-content');
      imageAssetsLoader.hasAsset = jasmine.createSpy('hasAsset').and.returnValue(true);
      TestBed.configureTestingModule({
        declarations: [
          SvgSpinnerComponent
        ],
        providers: [
          { provide: ImageAssetsLoader, useValue: imageAssetsLoader }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(SvgSpinnerComponent);

      component = fixture.componentInstance;
      fixture.autoDetectChanges();
      fixture.whenStable();
    }));

    describe('svg on image "src"', () => {
      it('replaces img src with svg content', () => {
        imageAssetsLoader.getAssetByName = jasmine.createSpy('getAssetByName').and.returnValue(BALL_SVG);
        component.spinner = 'ball';
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('img'));
        // tslint:disable-next-line:max-line-length
        expect(el.nativeElement.src).toEqual(`data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D'72px'%20height%3D'72px'%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%20class%3D%22uil-ball%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22none%22%20class%3D%22bk%22%3E%3C%2Frect%3E%3Cg%20transform%3D%22translate(50%2050)%22%3E%3Cg%3E%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2215%22%20fill%3D%22%231b4f80%22%20transform%3D%22%22%3E%3Canimate%20attributeName%3D%22cy%22%20calcMode%3D%22spline%22%20dur%3D%221s%22%20repeatCount%3D%22indefinite%22%20from%3D%2230%22%20to%3D%2230%22%20values%3D%2230%3B-30%3B30%22%20keySplines%3D%220.4%200.8%200.4%200.8%3B0.8%200.4%200.8%200.4%22%20keyTimes%3D%220%3B0.5%3B1%22%3E%3C%2Fanimate%3E%3C%2Fcircle%3E%3CanimateTransform%20%20type%3D%22rotate%22%20from%3D%220%22%20to%3D%22360%22%20dur%3D%221s%22%20repeatCount%3D%22indefinite%22%3E%3C%2FanimateTransform%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`);
      });
    });
    describe('dimensions', () => {
      it('has spinner width according "width" passed', async(() => {
        component.spinner = 'balls';
        component.width = 32;
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('img'));
        expect(el.nativeElement.width).toEqual(32);
      }));

      it('has spinner height according "height" passed', async(() => {
        component.spinner = 'balls';
        component.height = 32;
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('img'));
        expect(el.nativeElement.height).toEqual(32);
      }));
    });
  }));
});

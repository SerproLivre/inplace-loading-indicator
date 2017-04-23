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
        expect(el.nativeElement.src).toEqual(`<?xml version=\"1.0\" encoding=\"utf-8\"?><svg width='72px' height='72px' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-ball\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><g transform=\"translate(50 50)\"><g><circle cx=\"0\" cy=\"0\" r=\"15\" fill=\"#1b4f80\" transform=\"\"><animate attributeName=\"cy\" calcMode=\"spline\" dur=\"1s\" repeatCount=\"indefinite\" from=\"30\" to=\"30\" values=\"30;-30;30\" keySplines=\"0.4 0.8 0.4 0.8;0.8 0.4 0.8 0.4\" keyTimes=\"0;0.5;1\"></animate></circle><animateTransform  type=\"rotate\" from=\"0\" to=\"360\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform></g></g></svg>`);
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

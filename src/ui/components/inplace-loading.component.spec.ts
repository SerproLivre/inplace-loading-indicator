import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { InplaceLoadingComponent } from './inplace-loading.component';
import { ImageAssetsLoaderMock } from '../../../test/mocks/image-assets-loader.mock';
import { ChangeDetectorRefMock } from '../../../test/mocks/change-detector-ref.mock';
import { DomSanitizerMock } from '../../../test/mocks/dom-sanitizer.mock';
import { ObservableWatched } from '../../rx/index';
import { ImageAssetsLoader } from '../services/image-assets-loader.service';
import { runUnitTests, runIntegrationTests } from '../../../test/helpers';


describe('InplaceLoadingComponent', () => {

  let sanitizerMock: DomSanitizer;
  let imageAssetsLoaderMock: ImageAssetsLoaderMock;
  let changeDetectorRefMock: ChangeDetectorRef;
  let inplaceLoadingComponent: InplaceLoadingComponent;
  let observable: ObservableWatched<any>;
  let observer: Observer<any>;
  beforeEach(() => {
    imageAssetsLoaderMock = new ImageAssetsLoaderMock();
    changeDetectorRefMock = <any>new ChangeDetectorRefMock();
    sanitizerMock = <any>new DomSanitizerMock();
    inplaceLoadingComponent = new InplaceLoadingComponent(<any>imageAssetsLoaderMock, <any>changeDetectorRefMock, <any>sanitizerMock);
    observable = <ObservableWatched<any>>(new Observable((_observer) => {
      observer = _observer;
    }));
  });

  afterEach(() => {
    if (observer && !observer.closed) {
      observer.complete();
    }
  });

  describe('Unit Tests', runUnitTests(() => {
    describe('#loading', () => {
      it('loading is true when observable is running', () => {
        inplaceLoadingComponent.observable = observable;
        observable.subscribe(() => { });
        observer.next(null);
        expect(inplaceLoadingComponent.loading).toBeTruthy();
      });

      it('loading is false before observable execution starts', () => {
        expect(inplaceLoadingComponent.loading).toBeFalsy();
      });

      it('loading is false after observable execution ends', () => {
        inplaceLoadingComponent.observable = observable;
        observable.subscribe(() => { });
        expect(inplaceLoadingComponent.loading).toBeTruthy();
        observer.complete();
        expect(inplaceLoadingComponent.loading).toBeFalsy();
      });
    });
  }));

  describe('Integration Tests', runIntegrationTests(() => {


    @Component({
      selector: 'ngxs-not-used',
      template: `<serpro-inplace-loading
                        (afterLoad)="loadingFinished()" #loadingComp [observable]="observable">
                 </serpro-inplace-loading>`
    })
    class HostComponent {
      observable: Observable<any>;
      @ViewChild('loadingComp') loadingComp: ElementRef;

      loadingFinished() {
      }
    }

    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HostComponent, InplaceLoadingComponent],
        providers: [
          { provide: ImageAssetsLoader, useValue: imageAssetsLoaderMock }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(HostComponent);
      fixture.autoDetectChanges();
    }));

    it('display is "none" when observable is not running', () => {
      imageAssetsLoaderMock.getDefaultAsset = jasmine.createSpy('getDefaultAsset').and.returnValue('svg-xpto');
      fixture.componentInstance.observable = observable;
      const el = fixture.debugElement.query(By.css('serpro-inplace-loading img'));
      expect(el.componentInstance.style).toEqual('none');
    });

    it('display is "inline-block" when observable is running', () => {
      imageAssetsLoaderMock.getDefaultAsset = jasmine.createSpy('getDefaultAsset').and.returnValue('svg-xpto');
      fixture.componentInstance.observable = observable;
      fixture.detectChanges();
      observable.subscribe(() => { });
      observer.next(1);
      const el = fixture.debugElement.query(By.css('serpro-inplace-loading img'));
      expect(el.componentInstance.style).toEqual('inline-block');
    });


    it('display is "none" after observable completes', () => {
      imageAssetsLoaderMock.getDefaultAsset = jasmine.createSpy('getDefaultAsset').and.returnValue('svg-xpto');
      fixture.componentInstance.observable = observable;
      fixture.detectChanges();
      observable.subscribe(() => { });
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('serpro-inplace-loading img'));
      expect(el.componentInstance.style).toEqual('inline-block');
      observer.complete();
      expect(el.componentInstance.style).toEqual('none');
    });

    it('emits afterLoad event', () => {
      fixture.componentInstance.observable = observable;
      fixture.detectChanges();
      observable.subscribe(() => { });

      fixture.componentInstance.loadingFinished = jasmine.createSpy('loadingFinished');
      observer.complete();
      fixture.detectChanges();

      expect(fixture.componentInstance.loadingFinished).toHaveBeenCalled();

    });
  }));
});

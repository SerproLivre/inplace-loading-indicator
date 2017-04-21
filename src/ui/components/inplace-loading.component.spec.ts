import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  let changeDetectorRefMock: ChangeDetectorRef;
  let inplaceLoadingComponent: InplaceLoadingComponent;
  let observable: ObservableWatched<any>;
  let observer: Observer<any>;
  beforeEach(() => {
    changeDetectorRefMock = <any>new ChangeDetectorRefMock();
    inplaceLoadingComponent = new InplaceLoadingComponent(<any>changeDetectorRefMock);
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
      template: `<ngxs-inplace-loading
                        (afterLoad)="loadingFinished()" #loadingComp [observable]="observable">
                 </ngxs-inplace-loading>`
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
        declarations: [HostComponent, InplaceLoadingComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(HostComponent);
      fixture.autoDetectChanges();
    }));

    it('display is "none" when observable is not running', () => {
      fixture.componentInstance.observable = observable;
      const elLoadingCmp = fixture.debugElement.query(By.css('ngxs-inplace-loading'));
      expect(elLoadingCmp.nativeElement.style.display).toEqual('none');
    });

    it('display is "inline-block" when observable is running', () => {
      fixture.componentInstance.observable = observable;
      fixture.detectChanges();
      observable.subscribe(() => { });
      observer.next(1);
      fixture.detectChanges();
      const elLoadingCmp = fixture.debugElement.query(By.css('ngxs-inplace-loading'));
      expect(elLoadingCmp.nativeElement.style.display).toEqual('inline-block');
    });


    it('display is "none" after observable completes', () => {
      fixture.componentInstance.observable = observable;
      fixture.detectChanges();
      observable.subscribe(() => { });
      fixture.detectChanges();
      const elLoadingCmp = fixture.debugElement.query(By.css('ngxs-inplace-loading'));
      expect(elLoadingCmp.nativeElement.style.display).toEqual('inline-block');
      observer.complete();
      fixture.detectChanges();
      expect(elLoadingCmp.nativeElement.style.display).toEqual('none');
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

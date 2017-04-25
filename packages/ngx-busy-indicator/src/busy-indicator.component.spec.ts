import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { BusyIndicatorComponent } from './busy-indicator.component';
import { ChangeDetectorRefMock } from '../../../test/mocks/change-detector-ref.mock';
import { ObservableWatched } from '@pratico/rx-extensions';
import { runUnitTests, runIntegrationTests } from '../../../test/helpers';


describe(BusyIndicatorComponent.name, () => {

  let changeDetectorRefMock: ChangeDetectorRef;
  let inplaceLoadingComponent: BusyIndicatorComponent;
  let observable: ObservableWatched<any>;
  let observer: Observer<any>;
  beforeEach(() => {
    changeDetectorRefMock = <any>new ChangeDetectorRefMock();
    inplaceLoadingComponent = new BusyIndicatorComponent(<any>changeDetectorRefMock);
    observable = <ObservableWatched<any>>(<any>new Observable((_observer) => {
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
      selector: 'pratico-not-used',
      template: `<pratico-busy-indicator
                        (afterLoad)="loadingFinished()" #loadingComp
                        [observable]="observable">{{loadingText}}</pratico-busy-indicator>`
    })
    class HostComponent {
      observable: Observable<any>;
      loadingText = 'Processing...';
      @ViewChild('loadingComp') loadingComp: ElementRef;

      loadingFinished() {
      }
    }

    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HostComponent, BusyIndicatorComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(HostComponent);
      fixture.autoDetectChanges();
    }));

    describe('Content Projection', () => {

      it('projects content into the loading html', () => {
        const elLoadingCmp = fixture.debugElement.query(By.css('pratico-busy-indicator'));
        expect(elLoadingCmp.nativeElement.textContent).toEqual('Processing...');
      });

      it('updates element content if expression changes', () => {
        const elLoadingCmp = fixture.debugElement.query(By.css('pratico-busy-indicator'));
        expect(elLoadingCmp.nativeElement.textContent).toEqual('Processing...');
        fixture.componentInstance.loadingText = 'ABC';
        fixture.detectChanges();
        expect(elLoadingCmp.nativeElement.textContent).toEqual('ABC');
      });
    });

    describe('display behavior', () => {
      it('display is "none" when observable is not running', () => {
        fixture.componentInstance.observable = <any>observable;
        const elLoadingCmp = fixture.debugElement.query(By.css('pratico-busy-indicator'));
        expect(elLoadingCmp.nativeElement.style.display).toEqual('none');
      });

      it('display is "inline-block" when observable is running', () => {
        fixture.componentInstance.observable = <any>observable;
        fixture.detectChanges();
        observable.subscribe(() => { });
        observer.next(1);
        fixture.detectChanges();
        const elLoadingCmp = fixture.debugElement.query(By.css('pratico-busy-indicator'));
        expect(elLoadingCmp.nativeElement.style.display).toEqual('inline-block');
      });


      it('display is "none" after observable completes', () => {
        fixture.componentInstance.observable = <any>observable;
        fixture.detectChanges();
        observable.subscribe(() => { });
        fixture.detectChanges();
        const elLoadingCmp = fixture.debugElement.query(By.css('pratico-busy-indicator'));
        expect(elLoadingCmp.nativeElement.style.display).toEqual('inline-block');
        observer.complete();
        fixture.detectChanges();
        expect(elLoadingCmp.nativeElement.style.display).toEqual('none');
      });

      it('emits afterLoad event', () => {
        fixture.componentInstance.observable = <any>observable;
        fixture.detectChanges();
        observable.subscribe(() => { });

        fixture.componentInstance.loadingFinished = jasmine.createSpy('loadingFinished');
        observer.complete();
        fixture.detectChanges();

        expect(fixture.componentInstance.loadingFinished).toHaveBeenCalled();

      });
    });
  }));
});

import {
  Component, HostBinding, ChangeDetectorRef, Input, OnChanges,
  SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter/*, ViewChild, ElementRef,*/
} from '@angular/core';

import { ObservableWatched, ObservableWatcher } from '../../rx/index';

/**
 * Component which shows a svg loading indicator while a observable is executing
 *
 * @export
 * @class InplaceLoadingComponent
 * @implements {OnChanges}
 * @example ```
 *    <ngxs-inplace-loading>Processing...</ngxs-inplace-loading>
 *    or
 *    <ngxs-inplace-loading><ngxs-spinner spinner="balls"></ngxs-spinner></ngxs-inplace-loading>
 * ```
 */
@Component({
  selector: 'ngxs-inplace-loading',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InplaceLoadingComponent implements OnChanges {

  get loading() {
    return (this.observable && this.observable.watcher) ? this.observable.watcher.processing : false;
  }


  @Output()
  afterLoad = new EventEmitter<void>();

  _observable: ObservableWatched<any>;

  @HostBinding('style.display')
  get style() {
    return this.loading ? 'inline-block' : 'none';
  }

  constructor(
    protected ref: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add 'implements OnChanges' to the class.
    if (changes['observable'] && changes['observable'].currentValue) {
      this.ref.markForCheck();
    }
  }

  // get imageUrl(): SafeHtml {
  //   if (this.spinner && this.assets.getAssetByName(this.spinner)) {
  //     return this.sanitizer
  //       .bypassSecurityTrustResourceUrl(
  //       window['unescape'](this.assets.getAssetByName(this.spinner)).replace('"', '').replace('"', '')
  //       );
  //   } else {
  //     return this.sanitizer
  //       .bypassSecurityTrustResourceUrl(
  //       window['unescape'](this.assets.getDefaultAsset()).replace('"', '').replace('"', '')
  //       );
  //   }
  // }

  @Input()
  get observable(): ObservableWatched<any> {
    return this._observable;
  }

  set observable(value: ObservableWatched<any>) {
    if (value) {
      this._observable = ObservableWatcher.watch(value);
      this._observable.watcher.onCompleted.subscribe(() => {
        this.onAfterLoad();
      });
    }
  }

  private onAfterLoad() {
    this.afterLoad.emit();
    this.ref.markForCheck();
  }

}


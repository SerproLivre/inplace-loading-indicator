import {
  Component, HostBinding, ChangeDetectorRef, Input, OnChanges,
  SimpleChanges, ChangeDetectionStrategy, Output, EventEmitter/*, ViewChild, ElementRef,*/
} from '@angular/core';

import { ObservableWatched, ObservableWatcher } from '@pratico/rx-extensions';

/**
 * Component which shows a svg loading indicator while a observable is executing
 *
 * @export
 * @class InplaceLoadingComponent
 * @implements {OnChanges}
 * @example ```
 *    <pratico-inplace-loading>Processing...</pratico-inplace-loading>
 *    or
 *    <pratico-inplace-loading><pratico-spinner spinner="balls"></pratico-spinner></pratico-inplace-loading>
 * ```
 */
@Component({
  selector: 'pratico-busy-indicator',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusyIndicatorComponent implements OnChanges {

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


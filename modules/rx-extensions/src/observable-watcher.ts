import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export interface ObservableWatched<T> extends Observable<T> {
  watcher: ObservableWatcher<T>;
}

/**
 * ObservableWatcher allow to watch into a observable and so, know when it started and completed
 *
 * @export
 * @class ObservableWatcher
 * @template T
 */
export class ObservableWatcher<T> {

  processing = false;
  onStarted: EventEmitter<void> = new EventEmitter<void>();
  onCompleted: EventEmitter<void> = new EventEmitter<void>();
  observable: ObservableWatched<T>;
  observer: Observer<any>;
  private _debug = false;

  console = {
    log: function (...args: any[]) {
      if (this._debug) {
        window.console.log(arguments);
      }
    }
  };

  /**
   * Watchs into an Observable
   *
   * @static
   * @template U
   * @param {Observable<U>} observable
   * @returns {<ObservableWatched<U>>}
   *
   * @memberOf ObservableWatcher
   */
  static watch<U>(observable: Observable<U>) {
    new ObservableWatcher<U>(observable);
    return <ObservableWatched<U>>observable;
  }

  /**
   * Creates an instance of ObservableWatcher.
   * @param {Observable<any>} originObservable
   *
   * @memberOf ObservableWatcher
   */
  constructor(originObservable: Observable<any>) {
    if (!originObservable) {
      throw new Error('You should pass an Observable!!');
    }
    this.configureObservable(originObservable);
  }

  /**
   * Enables to write console.log into output
   *
   * @param {boolean} debug
   *
   * @memberOf ObservableWatcher
   */
  setDebug(debug: boolean) {
    this._debug = debug;
  }

  private completedHandler() {
    this.console.log('complete handler');
    this.processing = false;
    this.onCompleted.next();
  }

  private errorHandler(e: any) {
    this.console.log('error handler');
    this.processing = false;
    this.onCompleted.next();
  }

  private configureObservable(originObservable: Observable<any>) {
    const originalObservableSubscribe = originObservable.subscribe;
    (<ObservableWatched<T>>originObservable).watcher = this;
    this.console.log('subscribe configured');
    const __this = this;
    originObservable.subscribe = <any>(function (nextOriginal, errorOriginal, completeOriginal) {
      __this.console.log('subscribe called!');
      __this.processing = true;
      __this.onStarted.emit();
      const error = function () {
        __this.errorHandler.apply(__this, arguments);
        if (errorOriginal) {
          errorOriginal.apply(this, arguments);
        }
      };
      const complete = function () {
        __this.completedHandler.apply(__this, arguments);
        if (completeOriginal) {
          completeOriginal.apply(this, arguments);
        }
      };
      originalObservableSubscribe.apply(this, [nextOriginal, error, complete]);
    });
  }

}

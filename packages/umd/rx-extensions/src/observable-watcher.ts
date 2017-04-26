import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export interface WatchedObservable<T> extends Observable<T> {
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
  onStarted: ReplaySubject<void> = new ReplaySubject<void>(1);
  onCompleted: Subject<void> = new Subject<void>();
  observable: WatchedObservable<T>;
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
    return <WatchedObservable<U>>observable;
  }

  /**
   * Creates an instance of ObservableWatcher.
   * @param {Observable<any>} originObservable
   *
   * @m'em'berOf ObservableWatcher
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
    (<WatchedObservable<T>>originObservable).watcher = this;
    this.console.log('subscribe configured');
    const __this = this;
    originObservable.subscribe = <any>(function (nextOriginal, errorOriginal, completeOriginal) {
      __this.console.log('subscribe called!');
      __this.processing = true;
      __this.onStarted.next(null);
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

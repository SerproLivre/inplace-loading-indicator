import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export interface ObservableWatched<T> extends Observable<T> {
    watcher: ObservableWatcher<T>;
}

export class ObservableWatcher<T> {

    static watch<U>(observable: Observable<U>) {
        return new ObservableWatcher<U>(observable).get();
    }

    processing = false;

    onCompleted: EventEmitter<void> = new EventEmitter<void>();
    observable: ObservableWatched<T>;
    observer: Observer<any>;
    constructor(originObservable: Observable<any>) {
        if (!originObservable) {
            throw new Error('You should pass an Observable!!');
        }
        this.observable = <ObservableWatched<T>>(new Observable<T>((observer) => {
            this.observer = observer;
            this.processing = true;
            originObservable.subscribe(
                (v) => {
                    observer.next(v);
                },
                (e) => this.errorHandler(e),
                () => this.completedHandler()
            )
        }));
        this.observable.watcher = this;
    }

    get(): ObservableWatched<T> {
        return this.observable;
    }

    private completedHandler() {
        this.processing = false;
        this.observer.complete();
        this.onCompleted.next();
    }

    private errorHandler(e: any) {
        this.processing = false;
        this.observer.error(e);
        this.onCompleted.next();
    }


}
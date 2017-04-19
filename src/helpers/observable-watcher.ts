import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/subscribeOn';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/subscribeOn';
import { EventEmitter } from '@angular/core';

export class ObservableWatcher {

    processing = false;

    onCompleted: EventEmitter<void> = new EventEmitter<void>();
    observable: Observable<any>;
    constructor(private originObservable: Observable<any>) {
        if (!originObservable) {
            throw new Error('You should pass an Observable!!');
        }
    }

    get(): Observable<any> {
        return this.originObservable.do(null,
            this.errorHandler.bind(this),
            this.completedHandler.bind(this)
        );
    }

    private completedHandler() {
        this.processing = false;
        this.onCompleted.next();
    }

    private errorHandler(e: any) {
        this.onCompleted.next();
        this.processing = false;
    }


}
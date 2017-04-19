import {  Pipe, PipeTransform } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { ObservableWatcher } from '../helpers/observable-watcher';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'observableWatcher',
})
export class ObservableWatcherPipe implements PipeTransform {
    transform(value: Observable<any>,  ...args: any[]) {
        return new ObservableWatcher(value).get();
    }
}
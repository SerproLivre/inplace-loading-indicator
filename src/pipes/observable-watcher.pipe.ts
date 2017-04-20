import {  Pipe, PipeTransform } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { ObservableWatcher, ObservableWatched } from '../helpers/observable-watcher';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'observableWatcher',
})
export class ObservableWatcherPipe implements PipeTransform {
    transform(value: Observable<any>,  ...args: any[]): ObservableWatched<any> {
        return ObservableWatcher.watch(value);
    }
}
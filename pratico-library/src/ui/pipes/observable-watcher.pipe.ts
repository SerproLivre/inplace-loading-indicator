import {  Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ObservableWatcher, ObservableWatched } from '../../rx/index';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'observableWatcher'
})
export class ObservableWatcherPipe implements PipeTransform {
    transform(value: Observable<any>,  ...args: any[]): ObservableWatched<any> {
        ObservableWatcher.watch(value);
        return <ObservableWatched<any>> value;
    }
}

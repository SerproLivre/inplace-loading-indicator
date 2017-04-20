import { ObservableWatcherPipe } from "./observable-watcher.pipe";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe(ObservableWatcherPipe.name, () => {
    let watcherPipe: ObservableWatcherPipe;

    beforeEach(() => {
        watcherPipe = new ObservableWatcherPipe();
    });


    it('creates a watchedObservable', () => {
        let watchedObservable = watcherPipe.transform(Observable.of(2));
        expect(watchedObservable.watcher).toBeDefined();
    });

});

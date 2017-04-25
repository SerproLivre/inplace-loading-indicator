
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { ObservableWatcher, ObservableWatched } from './observable-watcher';

describe(ObservableWatcher.name, () => {
    let observable: ObservableWatched<any>;

    beforeEach(() => {
        observable = ObservableWatcher.watch<any>(Observable.of(1));
    });

    it('has processing false before subscription', () => {
        expect(observable.watcher.processing).toBeFalsy();
    });

    it('changes processing to true after subscription to the watched observable', (done) => {
        observable.subscribe(() => {
            expect(observable.watcher.processing).toBeTruthy();
            done();
        });
    });

    it('has processing equals false after the observable completes', (done) => {
        observable.subscribe(null, null, () => {
            expect(observable.watcher.processing).toBeFalsy();
            done();
        });
    });

    it('has processing equals false after observable execution raises error', (done) => {
        observable = ObservableWatcher.watch<any>(Observable.throw('Error'));
        observable.subscribe(null, (e) => {
            expect(observable.watcher.processing).toBeFalsy();
            done();
        });
    });
});

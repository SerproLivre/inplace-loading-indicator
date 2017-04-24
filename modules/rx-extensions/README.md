

# @pratico/rx-extensions

This package provides some Rx.js extensions created to use in the @pratico projects


## 1. ObservableWatcher

Allows to follow a observable and known when it starts and when it concludes.


Example:

```ts
let observable: ObservableWatched = ObservableWatcher.watch<any>(Observable.of(1));

observable.watcher.onStarted.subscribe(() => {
  console.log('Called only when the user subscribes!!!');
});

observable.watcher.onCompleted.subscribe(() => {
  console.log('Called only when the observable finished by completion or error');
});


observable.subscribe((val) => {
  console.log('Processing...', observable.watcher.processing); // returns true while the the observable is running
  console.log('Value', val); // will print Value 1
});
```



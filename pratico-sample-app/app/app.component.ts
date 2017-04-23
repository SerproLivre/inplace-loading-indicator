import { Component } from '@angular/core';

@Component({
    selector: 'pratico-app',
    template: `<pratico-todo-list></pratico-todo-list>
      <hr>
      <pratico-code-editor></pratico-code-editor>
    `,
})
export class AppComponent {}

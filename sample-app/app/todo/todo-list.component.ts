  import * as _ from 'lodash';
import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';

@Component({
    selector: 'pratico-todo-list',
    template: `<h1 class="main-title">Fuse-box NG2 Todo <pratico-spinner spinner="ball" width="50" height="50"></pratico-spinner></h1>
<md-card class="center-card">
    <md-input-container class="full-width">
        <input mdInput placeholder="Add a new todo" [(ngModel)]="newTodo.name" (keyup)="onKeyUp($event)">
    </md-input-container>
</md-card>

<md-card class="center-card padding-none">
    <md-card-content>
        <md-tab-group>
            <md-tab *ngFor="let listName of todoLists" label="{{listName}}">
                <pratico-todo-item [todo]="todo" (deleteTodo)="deleteTodo($event)" *ngFor="let todo of todos | todoFilter: listName">
                </pratico-todo-item>
            </md-tab>
        </md-tab-group>
    </md-card-content>
    <md-card-actions layout="row" layout-align="end center" *ngIf="shouldShowClearAll()">
        <button md-button (click)="clearAllDone()">Clear all done</button>
    </md-card-actions>
</md-card>`
})
export class TodoListComponent implements OnInit {
    todos: Todo[];
    newTodo: Todo;
    todoLists: string[];

    // This part is a little weird. @Inject shouldnt be necessary with TS, but it is with fuse-box
    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.todoLists = ['All', 'Pending', 'Done'];
        this.todos = this.todoService.getTodos();
        this.resetNewTodo();
    }
    onKeyUp(e: any) {
        if (e.keyCode === 13 && this.newTodo.name) {
            this.todos.push(this.newTodo);
            this.resetNewTodo();
        }
    }
    resetNewTodo() {
        this.newTodo = new Todo('', false);
    }
    deleteTodo(todo: Todo) {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }
    shouldShowClearAll() {
        return _.some(this.todos, { done: true });
    }
    clearAllDone() {
        this.todos = _.filter(this.todos, t => !t.done);
    }
}

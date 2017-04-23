import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'pratico-todo-item',
  template: `
    <div class="todo-item">
    <md-checkbox class="checkbox-label" [(ngModel)]="todo.done" *ngIf="!editMode">{{todo.name}}</md-checkbox>
    <md-input-container class="edit-input" *ngIf="editMode">
        <input mdInput [(ngModel)]="todo.name" (keyup)="onKeyUp($event)">
    </md-input-container>
    <button class="menu-button" md-icon-button [mdMenuTriggerFor]="menu">
        <i class="material-icons">more_vert</i>
    </button>
    <md-menu #menu="mdMenu">
        <button md-menu-item (click)="toggleEditMode()"> {{editMode ? 'Done editing' : 'Edit'}} </button>
        <button md-menu-item (click)="deleteButtonClicked()"> Delete</button>
    </md-menu>
  </div>

    `
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter<Todo>();
  editMode: boolean;

  ngOnInit() {
    this.editMode = false;
  }

  onKeyUp(e: any) {
    if (e.keyCode === 13 && this.todo.name) {
      this.editMode = false;
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  deleteButtonClicked() {
    this.deleteTodo.emit(this.todo);
  }
}

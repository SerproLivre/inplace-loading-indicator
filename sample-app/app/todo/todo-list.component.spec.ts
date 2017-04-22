import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TodoListComponent } from './todo-list.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TodoService } from './todo.service';

import { TodoFilter } from './todo-filter.pipe';

describe(TodoListComponent.name, () => {
  const todoServiceMock: TodoService = <any>{ getTodos: () => [{ name: 'task 1', done: false }] };
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoFilter
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceMock }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]

    }).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
  }));

  it('calls service to get todos', () => {
    fixture.componentInstance['todoService'].getTodos = jasmine.createSpy('getTodos').and.returnValue([]);
    fixture.detectChanges();
    expect(fixture.componentInstance['todoService'].getTodos).toHaveBeenCalled();
  });

  it('adds a new todo after fill the todo name and press Enter', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('input'));
    fixture.componentInstance.newTodo.name = 'new task';
    el.triggerEventHandler('keyup', { keyCode: 13 });
    fixture.detectChanges();
    expect(fixture.componentInstance.todos.find((item) => {
      return item.name === 'new task' && item.done === false;
    })).not.toBeNull();
  });

  it('resets the new Todo after initialization', () => {
    fixture.detectChanges();
    fixture.componentInstance.newTodo.name = 'new task';
    fixture.componentInstance.resetNewTodo = jasmine.createSpy('resetNewTodo').and.callThrough();
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.resetNewTodo).toHaveBeenCalled();
  });

  it('resets the new Todo after adding a new task', () => {
    fixture.detectChanges();

    fixture.componentInstance.resetNewTodo = jasmine.createSpy('resetNewTodo');

    const el = fixture.debugElement.query(By.css('input'));
    fixture.componentInstance.newTodo.name = 'new task';
    el.triggerEventHandler('keyup', { keyCode: 13 });
    fixture.detectChanges();

    expect(fixture.componentInstance.resetNewTodo).toHaveBeenCalled();
  });

  it('deletes a todo', () => {
    fixture.detectChanges();
    const firstTodo = fixture.componentInstance.todos[0];
    fixture.componentInstance.deleteTodo(firstTodo);
    expect(fixture.componentInstance.todos).not.toContain(firstTodo);
  });

  it('clears all done tasks', () => {
    fixture.detectChanges();

    const doneTask1 = { name: 'Done Task 1', done: true };
    const doneTask2 = { name: 'Done Task 2', done: true };

    fixture.componentInstance.todos.push(doneTask1);
    fixture.componentInstance.todos.push(doneTask2);
    fixture.componentInstance.clearAllDone();

    expect(fixture.componentInstance.todos).not.toContain(doneTask1);
    expect(fixture.componentInstance.todos).not.toContain(doneTask2);
  });

  it('#shouldShowClearAll responds true when exists done tasks', () => {
    fixture.detectChanges();

    const doneTask1 = { name: 'Done Task 1', done: true };
    fixture.componentInstance.todos.push(doneTask1);

    expect(fixture.componentInstance.shouldShowClearAll()).toBeTruthy();
  });

  it('#shouldShowClearAll responds false when does not exists done tasks', () => {
    fixture.detectChanges();
    const doneTask1 = { name: 'Done Task 1', done: false };
    fixture.componentInstance.todos.push(doneTask1);
    expect(fixture.componentInstance.shouldShowClearAll()).toBeFalsy();
  });


});

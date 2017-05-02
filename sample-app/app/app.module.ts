import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list.component';
import { TodoService } from './todo/todo.service';
import { TodoFilter } from './todo/todo-filter.pipe';
import { TodoItemComponent } from './todo/todo-item.component';
import { PraticoCodeEditorModule } from '@pratico/ngx-code-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MaterialModule,
        PraticoCodeEditorModule.forRoot()
    ],
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoFilter,
        TodoItemComponent
    ],
    providers: [TodoService],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

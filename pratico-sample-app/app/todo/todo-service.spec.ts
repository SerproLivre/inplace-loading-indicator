
import { TodoService } from './todo.service';

describe(TodoService.name, () => {
    let todoService: TodoService;

    beforeEach(() => {
        todoService = new TodoService();
    });

    it('returns todos', () => {
        expect(todoService.getTodos()).toEqual([{ done: false, name: 'foo' }, { done: false, name: 'bar' }]);
    });
});

import { TestBed } from '@angular/core/testing';

import { TodoListServerService } from './todo-list-server.service';

describe('TodoListServerService', () => {
  let service: TodoListServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

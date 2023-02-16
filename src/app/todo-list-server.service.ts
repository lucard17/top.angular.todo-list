import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListServerService {
  private todoListStates: TodoItem[][] = [
    [{id: 1, title: 'first todo', completed: false},
      {id: 2, title: 'second todo', completed: false},
      {id: 3, title: 'third todo', completed: false},]
  ];
  private currentState: number = this.todoListStates.length;

  constructor() {
    const storage = sessionStorage.getItem('todoList');
    let savedList: TodoItem[][];
    if (storage !== null) {
      savedList = JSON.parse(storage);
      if (savedList[0].length !== 0) {
        this.todoListStates = savedList;
      }
    }
    this.currentState = this.todoListStates.length;
  }

  pushState(state: TodoItem[]): TodoItem[] {
    this.todoListStates.splice(this.currentState, this.todoListStates.length - (this.currentState), state);
    this.currentState = this.todoListStates.length;
    return this.getState();
  }

  getState(): TodoItem[] {
    return this.todoListStates[this.currentState - 1].map((item: TodoItem) => {
      return {...item}
    });
  }

  undo(): TodoItem[] {
    if (this.currentState > 1) {
      this.currentState -= 1
    }
    return this.getState();
  }

  save(): TodoItem[] {
    this.todoListStates = this.todoListStates.slice(this.currentState - 1, this.currentState);
    this.currentState = this.todoListStates.length;
    sessionStorage.setItem('todoList', JSON.stringify(this.todoListStates));
    return this.getState();
  }

  redo(): TodoItem[] {
    if (this.currentState < this.todoListStates.length) {
      this.currentState += 1
    }
    return this.getState();
  }

  getNavSteps(): { undo: number, redo: number } {
    return {undo: this.currentState - 1, redo: this.todoListStates.length - this.currentState}
  }
}


export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

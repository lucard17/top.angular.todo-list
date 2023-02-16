import {Component, OnInit} from '@angular/core';
import {TodoListServerService, TodoItem} from "../todo-list-server.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  public formInput: string = '';
  public undoSteps: number = 0;
  public redoSteps: number = 0;

  constructor(private todoServer: TodoListServerService) {

  }

  ngOnInit() {
    this.todoList = this.todoServer.getState();

  }
  getNavSteps(){
    ({undo:this.undoSteps,redo:this.redoSteps}=this.todoServer.getNavSteps());
  }
  addItemHandle() {
    const newTodoItem: TodoItem = {
      id: Date.now(),
      title: this.formInput,
      completed: false
    }
    this.todoList.push(newTodoItem);
    this.todoList = this.todoServer.pushState(this.todoList);
    this.getNavSteps();
    this.formInput = '';
  }

  onChangeHandle(event: { id: number; title: string; }) {
    this.todoList.forEach(item => {
      if (item.id === event.id) {
        item.title = event.title;
      }
    })
    this.todoList = this.todoServer.pushState(this.todoList);
    this.getNavSteps();
  }

  onCompleteHandle(event: { id: number, completed: boolean }) {
    this.todoList.forEach(item => {
      if (item.id === event.id) {
        item.completed = event.completed;
      }
    })
    this.todoList = this.todoServer.pushState(this.todoList);
    this.getNavSteps();
  }

  onDeleteHandle(event: { id: number }) {
    this.todoList = this.todoList.filter(item => (item.id !== event.id))
    this.todoList = this.todoServer.pushState(this.todoList);
    this.getNavSteps();
  }

  undoHandle() {
    this.todoList = this.todoServer.undo();
    this.getNavSteps();
  }

  redoHandle() {
    this.todoList = this.todoServer.redo();
    this.getNavSteps();
  }

  saveHandle() {
    this.todoList = this.todoServer.save();
    this.getNavSteps();
  }

}

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TodoItem} from "../todo-list-server.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  private id: number = 0;
  private _title: string = "";
  private _completed: boolean = false;
  public onEdit = false;
  @Input() todoItem!: TodoItem;
  @Output() onChange = new EventEmitter();
  @Output() onComplete = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  get title() {
    return this._title;
  }

  get completed() {
    return this._completed;
  }

  editHandle(title: any) {
    if (this.onEdit && this._title !== title) {
      this.onChange.emit({id: this.id, title});

    }
    this.onEdit = !this.onEdit;
  }

  completedHandle() {
    this.onComplete.emit({id: this.id, completed: !this._completed});
  }
  deleteHandle(){
    this.onDelete.emit({id: this.id});
  }
  ngOnInit() {
    ({id: this.id, title: this._title, completed: this._completed} = this.todoItem);
  }

}


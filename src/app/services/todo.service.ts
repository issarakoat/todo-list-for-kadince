import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoCollection: AngularFirestoreCollection<Todo>;
  currentUser: User;
  todos: Observable<Todo[]>;
  currentTodo: Todo;
  constructor(
    private userService: UserService,
    private afs: AngularFirestore,
  ) {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
      if (this.currentUser){
        this.todoCollection = this.afs.collection<Todo>(`${this.currentUser.uid}_todo`);
      }
    });
   }
   onFetchTodos(): Observable<Todo[]> {
    this.todos = this.todoCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.todos;
  }
  onGetTodoById(id: string): Observable<any>{
    return this.afs.collection<Todo>(`${this.currentUser.uid}_todo`).doc(id).valueChanges();
  }
  onCreateTodo(todo: Todo): Promise<DocumentReference> {
    todo.completed = false;
    return this.todoCollection.add(todo);
  }
  onDeleteTodo(id): void {
    this.afs.doc(`${this.currentUser.uid}_todo/${id}`).delete().catch(err => {
      console.error(err);
    }).finally( () => {
      console.log('successfully deleted');
    });
  }
  onUpdateComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.afs.doc(`${this.currentUser.uid}_todo/${todo.id}`).update(todo).catch(err => {
      console.error(err);
    }).finally( () => {
      console.log('successfully update');
    });
  }
  onEditTodoContent(todo: Todo, newContent: string): void {
    todo.content = newContent;
    this.afs.doc(`${this.currentUser.uid}_todo/${todo.id}`).update(todo).catch(err => {
      console.error(err);
    }).finally( () => {
      console.log('successfully edited content');
    });
  }
}

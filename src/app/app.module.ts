import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateUpdateDialogComponent } from './components/create-update-dialog/create-update-dialog.component';
import { FilterTodosPipe } from './pipes/filter-todos.pipe';
import { FilterSearchBoxPipe } from './pipes/filter-search-box.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { ShowTodoDetailDialogComponent } from './components/show-todo-detail-dialog/show-todo-detail-dialog.component';
import { DisplayedTodosPipe } from './pipes/displayed-todos.pipe';
import { ShowChartDialogComponent } from './components/show-chart-dialog/show-chart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
    CreateUpdateDialogComponent,
    FilterTodosPipe,
    FilterSearchBoxPipe,
    ShortenTextPipe,
    ShowTodoDetailDialogComponent,
    DisplayedTodosPipe,
    ShowChartDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    MaterialModule,
    GoogleChartsModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

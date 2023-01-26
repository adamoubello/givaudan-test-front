import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { StorageModule } from './store/storage.module';
import { CustomerService } from './services/customer.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ModalServiceModule } from './services/modal-service/modal-service.module';
import { MyModalComponent } from './shared/my-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerTableComponent, 
    MyModalComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule, ModalServiceModule.forRoot(),
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [CustomerService,
    //{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    //{ provide: ErrorHandler, useClass: ErrorHandler }
  ],
  entryComponents: [MyModalComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';



@NgModule({
  declarations: [GenericTableComponent, GenericButtonComponent, ModalConfirmationComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    NgbModule
  ],
  exports: [
    GenericTableComponent,
    GenericButtonComponent,
    ModalConfirmationComponent
  ],
  entryComponents: [
    GenericButtonComponent,
    ModalConfirmationComponent
  ]
})
export class UtilityModule { }

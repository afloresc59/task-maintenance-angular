import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { GenericButtonComponent } from './generic-button/generic-button.component';



@NgModule({
  declarations: [GenericTableComponent, GenericButtonComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    NgbModule
  ],
  exports: [
    GenericTableComponent,
    GenericButtonComponent
  ],
  entryComponents: [
    GenericButtonComponent
  ]
})
export class UtilityModule { }

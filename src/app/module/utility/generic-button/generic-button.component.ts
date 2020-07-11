import { GenericBean } from './../../../model/generic-bean';
import { Component } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent implements ICellRendererAngularComp {

  gridParameters: any;
  msjToolTipEdit: string;
  msjToolTipDelete: string;
  msjToolTipView: string;

  constructor(private configToolTip: NgbTooltipConfig) { }

  agInit(parameters: any) {
    this.gridParameters = parameters;
    this.initSettingsToolTip();
    this.initMessagesToolTips();
  }
  
  initMessagesToolTips() {
    this.msjToolTipEdit = "Edit";
    this.msjToolTipDelete = "Delete";
    this.msjToolTipView = "View";
  }

  initSettingsToolTip() {
    this.configToolTip.placement = 'right';
    this.configToolTip.triggers = 'hover';
    this.configToolTip.container = 'body';
  }

  buildGenericBean() {
    const genericBean = new GenericBean();
    genericBean.id = this.gridParameters.data.id;
    return genericBean;
  }

  callMethodVisualize() {
    this.gridParameters.context.componentParent.executeMethodVisualize(this.buildGenericBean());
  }

  callMethodModify() {
    this.gridParameters.context.componentParent.executeMethodModify(this.buildGenericBean());
  }

  callMethodDelete() {
    this.gridParameters.context.componentParent.executeMethodDelete(this.buildGenericBean());
  }

  refresh(): boolean {
    return false;
  }

}

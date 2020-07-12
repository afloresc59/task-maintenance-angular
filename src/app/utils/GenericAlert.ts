export class GenericAlert {
  messageVisible: boolean;
  statusOperation: string;
  styleMessage: string;
  message: string;

  showMessage(isValid: boolean, message: string) {
    this.message = message;
    this.messageVisible = true;
    this.styleMessage = isValid ? 'fas fa-check iconoMenu' : 'fas fa-times iconoMenu';
    this.statusOperation = isValid ? 'success' : 'danger';
    setTimeout(() => this.messageVisible = false, 4000);
  }
}
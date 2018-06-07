import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messagesSuccess: string[] = [];
  messagesErrors: string[] = [];

  constructor() {
  }

  addSuccess(message: string) {
    this.messagesSuccess.push(message);
    setTimeout(() => {
      this.messagesSuccess = [];
    }, 3000);
  }

  addErrors(message: string) {
    this.messagesErrors.push(message);
    setTimeout(() => {
      this.messagesErrors = [];
    }, 3000);
  }

  clearSuccess() {
    this.messagesSuccess = [];
  }

  clearErros() {
    this.messagesErrors = [];
  }
}

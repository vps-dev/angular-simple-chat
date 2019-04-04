import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: { user: string, text: string} [];

  constructor() {
    this.messages =  JSON.parse(localStorage.getItem('messages')) || [];
  }

  public get list(): { user: string, text: string} [] {
    return this.messages;
  }

  add(message: { user: string, text: string }) {
    this.messages.push(message);
    this.updateStorage();
  }

  edit(messageId: number, messageText: string) {
    this.messages[messageId].text = messageText;
    this.updateStorage();
  }

  delete(messageId: number) {
    this.messages.splice(messageId, 1);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}

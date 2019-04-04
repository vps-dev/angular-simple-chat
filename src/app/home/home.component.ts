import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  newMessageForm: FormGroup;
  messages: { user: string, text: {} }[];
  isEditMessage: boolean;
  editMessageID: number;
  buttonLabel: string;
  @ViewChild("chatContainer", {read: ElementRef}) chatContainer: ElementRef;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private messagesService: MessagesService
  ) {
    // redirect to login if not logged in
    if (!this.authenticationService.currentUser) {
        this.router.navigate(['/login']);
    }

    this.newMessageForm = new FormGroup(
      {
        message: new FormControl("", [Validators.required]),
      }
    );

    this.messages = this.messagesService.list;
    this.buttonLabel = 'Send';
  }

  ngOnInit() {
  }

  deleteMessage(messageId: number) {
    this.messagesService.delete(messageId);
    this.newMessageForm.reset();
  }

  editMessage(messageId: number) {
    this.isEditMessage = true;
    this.buttonLabel = 'Edit';
    this.editMessageID = messageId;
    this.newMessageForm.controls['message'].setValue(this.messages[this.editMessageID].text);
  }

  scrollChatContainer() {
    window.setTimeout(()=> {
      var chatContainer = this.chatContainer.nativeElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);
  }

  onMessageSubmit() {
    if (this.newMessageForm.invalid) {
      return;
    }

    // if edit message mode is active
    if (this.isEditMessage && this.editMessageID != -1) {
      this.messagesService.edit(this.editMessageID, this.newMessageForm.value.message);
      this.isEditMessage = false;
      this.buttonLabel = 'Send';
      this.editMessageID = -1;
    }
    else {
      var message: { user: string, text: string } = {
        user: this.authenticationService.currentUser,
        text: this.newMessageForm.value.message
      }
      this.messagesService.add(message);

      // scroll chat container to bottom
      this.scrollChatContainer();
    }

    this.newMessageForm.reset();
  }
}

import {Component} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {AppData} from "../../providers/app-data.service";
import * as moment from 'moment';

@Component({
  selector: 'page-messages-list',
  templateUrl: 'messages-list.html',
  styleUrls: ['./messages-list.scss']
})
export class MessagesListPage {

  chats = [];

  constructor(public userData: UserData, public appData: AppData) {
  }

  loadChats() {
    this.appData.getChats().subscribe((data: any) => {
      this.chats = data;
      this.userData.getUserMessages().then((userChats) => {
        this.chats = [...this.chats, ...userChats];
        this.chats = this.chats.map((chat) => {
          chat.messages = chat.messages.map((m) => {
            return {...m, friendlyTime: moment(m.time).fromNow()}
          });
          return chat;
        });
        this.userData.getDeletedChats().then((chatIds) => {
          this.chats = this.chats.filter(c => chatIds.indexOf(c.id) == -1);
        });
      });
    });
  }

  ionViewWillEnter() {
    this.loadChats();
  }
}

import {Component, ViewChild} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {AppData} from "../../providers/app-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {Message} from "../../interfaces/message";
import {AlertController, ToastController} from "@ionic/angular";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  styleUrls: ['./chat.scss']
})
export class ChatPage {

  chatId: number;
  chat: any;
  userMessage: string;

  @ViewChild('content', {static: false}) content: any;

  constructor(public userData: UserData,
              private router: Router,
              private alertController: AlertController,
              private toastCtrl: ToastController,
              private route: ActivatedRoute,
              public appData: AppData) {
  }

  loadChat(chatId) {
    this.appData.getChats().subscribe((data: any) => {
      let chats = data;
      this.userData.getUserMessages().then((userChats) => {
        chats = [...chats, ...userChats];
        chats = chats.map((chat) => {
          chat.messages = chat.messages.map((m) => {
            return {...m, friendlyTime: moment(m.time).fromNow()}
          });
          return chat;
        });
        this.chat = chats.find(c => c.id == chatId);
        this.appData.getListings('',[]).subscribe((data: any) => {
          let listings = data;
          this.userData.getUserListings().then((l => {
            if(l) {
              listings = [...listings, ...l.map(listing =>{ return {...listing, hide: false}})]
            }

            let associatedListing = listings.find(l => l.id == this.chat.listingId);
            this.chat = {...this.chat, listing: associatedListing};
          }))
        });


        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 500)
      });
    });
  }


  ionViewWillEnter() {
    this.chatId = Number.parseInt(this.route.snapshot.paramMap.get('chatId'));
    this.loadChat(this.chatId);
  }

  simulatedResponse(save = false) {

    let  the10commandments = [
        "Thou shalt have no other gods before Me.",
        "Thou shalt not make idols.",
        "Thou shalt not take the name of the LORD thy God in vain.",
        "Remember the Sabbath day, to keep it holy.",
        "Honor thy father and thy mother.",
        "Thou shalt not murder.",
        "Thou shalt not commit adultery.",
        "Thou shalt not steal.",
        "Thou shalt not bear false witness against thy neighbor.",
        "Thou shalt not covet thy neighbour’s wife, thou shalt not covet thy neighbour’s house ."
      ];

    let randomTimeout = Math.floor((Math.random() * 5000) + 3000);
    let newMessage:any = {
      sender: this.chat.owner,
      message: the10commandments[Math.floor((Math.random() * 9) + 0)],
      time: new Date().toISOString()};

    newMessage = {...newMessage, friendlyTime: moment(newMessage.time).fromNow()};

    setTimeout(() => {
      if(!save) {
        this.chat.messages.push(newMessage);
        this.content.scrollToBottom(300);
      } else {
        this.userData.addUserChatMessage(this.chatId, this.chat.owner, newMessage.message).then(() => {
          this.chat.messages.push(newMessage);
          this.content.scrollToBottom(300);
        });
      }
    }, randomTimeout);
  }

  onSendMessage() {
    this.userData.addUserChatMessage(this.chatId, "Me", this.userMessage).then((data) => {
      let newMessage:any = {
        sender: 'Me',
        message: this.userMessage,
        time: new Date().toISOString()};
      newMessage = {...newMessage, friendlyTime: moment(newMessage.time).fromNow()};

      if(data == 'NON_USER') {
        this.chat.messages.push(newMessage);
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 250);
        this.simulatedResponse(false);
      } else {
        this.chat.messages.push(newMessage);
        setTimeout(() => {
          this.content.scrollToBottom(300);
        }, 250);
        this.simulatedResponse(true);
      }

      this.userMessage = '';


    });
  }

  async presentConfirmDelete() {
    const alert = await this.alertController.create({
      header: 'Delete Chat?',
      message: `Are you sure you want to delete your chat with ${this.chat.owner}?`,
      buttons: [
        {
          text: 'No, Keep it',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // Do nothing
          }
        }, {
          text: 'Yes, Delete',
          handler: () => {
            this.deleteChat(this.chatId);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteChat(chatId) {
    this.userData.addToDeleteChats(chatId).then(async () => {
      const toast = await this.toastCtrl.create({
        message: `Deleted a chat with ${this.chat.owner}.`,
        duration: 2000
      });
      toast.present();
      this.router.navigateByUrl("/app/tabs/messages");
    });
  }

  onViewDetails(listingId) {
    console.log(listingId);
    this.router.navigateByUrl("/app/tabs/my-listings/listing/" + listingId + "?from=chat");
  }


}

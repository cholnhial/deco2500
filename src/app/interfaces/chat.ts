import {Message} from "./message";

export interface Chat {
  id?: number,
  listingId?: number,
  messages: Array<Message>,
  owner?: string,
  ownerAvatar?: string
}

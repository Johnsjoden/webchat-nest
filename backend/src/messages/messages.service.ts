import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';
import { Message } from './message.interface';

@Injectable()
export class MessagesService {
    private readonly messages: Message[] = [
    ]
    getAllMessages(): Message[] {
        return this.messages
    }
    createMessage(message: Message): void {
        let currentDate = new Date().getTime()
        message.timeStamp = new Date(currentDate).toLocaleString()
        this.messages.push(message)
    }
}

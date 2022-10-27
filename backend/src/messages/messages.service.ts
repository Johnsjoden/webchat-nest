import { Injectable } from '@nestjs/common';
import { Messages, MessagesDocument } from './messages.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class MessagesService {
    constructor(@InjectModel(Messages.name) private msgDB: Model<MessagesDocument>) { }
    /* private readonly messages: Messages[] = [
    ] */
    async findAll(): Promise<Messages[]> {
        const result = this.msgDB.find()
        return result
    }
    async createMessage(message: Messages): Promise<void> {
        let currentDate = new Date().getTime()
        message.timeStamp = new Date(currentDate).toLocaleString()
        const result = await this.msgDB.create({ ...message })
    }
}

import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';
import { Messages } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Messages) private msgDB: Repository<Messages>) { }
    /* private readonly messages: Messages[] = [
    ] */
    getAllMessages(): Promise<Messages[]> {
        const result = this.msgDB.find()
        return result
    }
    async createMessage(message: Messages): Promise<void> {
        let currentDate = new Date().getTime()
        message.timeStamp = new Date(currentDate).toLocaleString()
        const result = await this.msgDB.save({...message})
    }
}

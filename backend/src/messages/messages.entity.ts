import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type MessagesDocument = Messages & Document;
@Schema()
export class Messages {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    })
    _id: string;

    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop()
    timeStamp: string;
}
export const MessagesSchema = SchemaFactory.createForClass(Messages);
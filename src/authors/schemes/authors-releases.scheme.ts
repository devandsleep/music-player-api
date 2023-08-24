import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: false })
export class AuthorsRelease {
    @Prop()
    id: number;

    @Prop()
    author_id: number;

    @Prop({ type: [Number] })
    releases: number[];

}

export type AuthorsReleaseDocument = AuthorsRelease & Document;
export const AuthorsReleaseSchema = SchemaFactory.createForClass(AuthorsRelease);
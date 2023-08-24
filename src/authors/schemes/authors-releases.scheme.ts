import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: false })
export class AuthorsReleases {
    @Prop()
    id: number;

    @Prop()
    author_id: number;

    @Prop({ type: [Number] })
    releases: number[];

}

export type AuthorsReleasesDocument = AuthorsReleases & Document;
export const AuthorsReleasesSchema = SchemaFactory.createForClass(AuthorsReleases);
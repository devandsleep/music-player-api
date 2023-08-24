import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Track {
    @Prop()
    track_id: number;

    @Prop({ type: [Number] })
    authors: number[];

    @Prop()
    is_drop: boolean;
}

export type TrackDocument = Track & Document;
export const TrackSchema = SchemaFactory.createForClass(Track);


@Schema({ timestamps: true })
export class Release {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    preview: string;

    @Prop({ type: [TrackSchema] })
    tracks: TrackDocument[];

    @Prop()
    release_date: Date;
}

export type ReleaseDocument = Release & Document;
export const ReleaseSchema = SchemaFactory.createForClass(Release);
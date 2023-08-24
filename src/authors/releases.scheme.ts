import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // Импортируйте Document

@Schema()
export class Track {
    @Prop()
    track_id: number;

    @Prop({ type: [Number] })
    authors: number[];

    @Prop()
    is_drop: boolean;
}

export type TrackDocument = Track & Document; // Создайте тип для документа

export const TrackSchema = SchemaFactory.createForClass(Track); // Создайте схему

@Schema({ timestamps: true })
export class Release {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    preview: string;

    @Prop({ type: [TrackSchema] }) // Используйте схему TrackSchema здесь
    tracks: TrackDocument[]; // Используйте тип TrackDocument[]

    @Prop()
    release_date: Date;
}

export type ReleaseDocument = Release & Document; // Создайте тип для документа

export const ReleaseSchema = SchemaFactory.createForClass(Release);

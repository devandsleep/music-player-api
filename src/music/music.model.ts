import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MusicCreationAttrs {
    title: string,
    preview?: string,
    audio: string,
    auditions?: number,
}

@Table({ tableName: 'music' })
export class Music extends Model<Music, MusicCreationAttrs> {

    @ApiProperty({ example: 'without you' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: 'preview.jpg', description: 'track preview picture' })
    @Column({ type: DataType.STRING, allowNull: true })
    preview: string;

    @ApiProperty({ example: 'audio.mp3', description: 'track name' })
    @Column({ type: DataType.STRING, allowNull: false })
    audio: string;

    @ApiProperty({ example: '1000' })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    auditions: number;

    @ApiProperty({ example: '1' })
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    release: number;
}
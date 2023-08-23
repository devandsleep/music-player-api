import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AuthorCreationAttrs {
    username: string;
    password: string;
}

@Table({ tableName: 'authors' })
export class Authors extends Model<Authors, AuthorCreationAttrs> {
    @ApiProperty({ example: '1' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'nickname' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @ApiProperty({ example: 'avatar.jpg', description: 'user profile picture' })
    @Column({ type: DataType.STRING, allowNull: true })
    avatar: string;

    @ApiProperty({ example: '123456789' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'About author' })
    @Column({ type: DataType.STRING, allowNull: true })
    about: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    username: string;
    password: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
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
}
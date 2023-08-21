import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    username: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'nickname' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @ApiProperty({ example: 'avatar.jpg', description: 'user profile picture' })
    @Column({ type: DataType.STRING, allowNull: true })
    picture: string;

    @ApiProperty({ example: '123456789' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'is the user banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'blocked for hooliganism', description: 'ban reason' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

}
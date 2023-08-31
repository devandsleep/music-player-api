import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AuthorUpdateDto {
    @ApiProperty({example: 'Eminem'})
    @IsString({message: "must be a string"})
    readonly username: string;

    @ApiProperty({example: '12345678abc!'})
    @IsString({message: "must be a string"})
    readonly password: string;

    @ApiProperty({example: 'Any description'})
    @IsString({message: "must be a string"})
    readonly about?: string;
}
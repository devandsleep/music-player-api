import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class AuthorDataDto {
    @ApiProperty({example: 'nickname'})
    @IsString({message: "must be a string"})
    readonly username: string;


    @ApiProperty({example: 'abc123456789'})
    @IsString({message: "must be a string"})
    @MinLength(5, {message: "password length should be at least 5 chars"})
    readonly password: string;
}
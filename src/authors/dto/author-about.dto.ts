import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthorAboutDto {
    @ApiProperty({example: 'The legend!'})
    @IsString({message: "must be a string"})
    readonly about: string;
}
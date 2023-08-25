import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MusicDataDto {
    @ApiProperty({example: 'without you'})
    @IsString({message: "must be a string"})
    readonly title: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateMusicDto {
    @ApiProperty({example: 'without you'})
    @IsString({message: "must be a string"})
    readonly title: string;

    @ApiProperty({example: '123'})
    @IsNumber({}, {message: 'must be a number'})
    readonly auditions: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class MusicDataDto {
    @ApiProperty({example: 'without you'})
    readonly title: string;
    
    @ApiProperty({example: 'eminem.mp3'})
    readonly audio: string;

    @ApiProperty({example: '1'})
    @IsNumber({}, {message: 'must be a number'})
    readonly authorId: number;

    @ApiProperty({example: 'eminem.jpg'})
    readonly preview: string;

}
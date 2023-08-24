import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, MinLength } from "class-validator";

export class CreateReleaseDto {

    readonly id: number;

    @ApiProperty({example: 'nickname'})
    @IsString({message: "must be a string"})
    readonly title: string;

    readonly preview: string;
    
    @IsString({message: "must be a string"})
    readonly tracks: object[];

    @IsDate({message: "must be a date"})
    readonly release_date: Date;
}
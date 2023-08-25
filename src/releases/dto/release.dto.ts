import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReleaseDto {

    @ApiProperty({example: '1'})
    @IsNumber({}, {message: "must be a number"})
    readonly id: number;

    @ApiProperty({example: 'The Real Slim Shady'})
    @IsString({message: "must be a string"})
    readonly title: string;

    @ApiProperty({example: 'image.jpg', })
    @IsNotEmpty({message: 'img file is required'})
    readonly preview: string;
    
    @ApiProperty({example: [1, 2, 3], })
    @IsArray({message: 'must be an array'})
    readonly tracks: object[];

    @IsDate({message: "must be a date"})
    readonly release_date: Date;
}
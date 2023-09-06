import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateMusicReleaseDto {
    @ApiProperty({example: '123'})
    @IsNumber({}, {message: 'must be a number'})
    readonly release: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class MusicDataDto {
    @ApiProperty({example: 'without you'})
    readonly title: string;
}
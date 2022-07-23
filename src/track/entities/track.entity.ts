import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class Track {
  @IsUUID('4')
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

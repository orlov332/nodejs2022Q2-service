import { IsInt, IsString } from 'class-validator';

export class Album {
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsInt()
  year: number;

  artistId: string | null; // refers to Artist
}

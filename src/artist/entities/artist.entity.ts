import { IsString } from 'class-validator';

export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  id: string; // uuid v4

  @IsString()
  name: string;

  grammy: boolean;
}

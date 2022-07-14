import { IsString, IsUUID } from 'class-validator';

export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  @IsUUID('4')
  id: string; // uuid v4

  @IsString()
  name: string;

  grammy: boolean;
}

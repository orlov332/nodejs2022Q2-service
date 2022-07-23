export class Favorites {
  constructor(
    public artists: string[] = [], // favorite artists ids
    public albums: string[] = [], // favorite albums ids
    public tracks: string[] = [], // favorite tracks ids
  ) {}
}

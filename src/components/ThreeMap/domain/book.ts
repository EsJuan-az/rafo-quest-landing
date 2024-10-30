import { HexPath } from "./path";

export class Book {
  public id: string;
  public name: string;
  public image: string;
  public sound: string;
  public color: string;
  public path: HexPath | null = null;
  constructor(id: string, name: string, sound: string, image: string, color: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.sound = sound;
    this.color = color;
  }
  setPath(path: HexPath){
    this.path = path;
  }
}

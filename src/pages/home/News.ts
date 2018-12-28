export class News{

  title: string;
  url: string;
  picLink: string;
  description: string;
  source: string;
  date: string;

  constructor(title: string, url: string, picLink:string, description: string, source: string, date: string){
    this.title = title
    this.url = url;
    this.picLink = picLink;
    this.description = description;
    this.source = source;
    this.date = date;
  }
}

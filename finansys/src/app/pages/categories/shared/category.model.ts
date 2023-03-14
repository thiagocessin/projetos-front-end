
export class Category  {
  constructor(
    public id?:number,
    public name?: string,
    public description?: string
  ){
  }


  static fromJson(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}

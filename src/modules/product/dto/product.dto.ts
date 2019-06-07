export class productDto
{

   public readonly id : number;
   public readonly name : string;
   public readonly state: string;
   public readonly description : string;
   public readonly price : number;
   public readonly cant : number;
   public readonly adictionalInformation : string;
   public readonly imgProduct : string;
   public readonly imgNutritionalTable : string;
   public readonly fk_trademark: number;
   public readonly fk_category: number;
}
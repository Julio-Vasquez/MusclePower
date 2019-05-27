export class Response{

    private Data: any;
    private Message: string;
    private State: any;
    
    public status(State: any)
    {
      this.Message = undefined;
      this.State = State;
      return this;
    }

    public message(Type? : string)
    {
      this.Message = Type;
      return this;
    }

    public json(Data? : any)
    {
      this.Data = Data;
      return{
        ...this.State,
        message: this.Message,
        data: this.Data
      }
    }
    
  }
  
  export default new Response();
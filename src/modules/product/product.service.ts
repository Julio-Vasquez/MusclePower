import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';


@Injectable()
export class AuthService {

  constructor( private readonly connection: Connection )
    {
        
    }
}
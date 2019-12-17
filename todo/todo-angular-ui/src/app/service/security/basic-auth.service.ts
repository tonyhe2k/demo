import { Injectable } from '@angular/core';
import { AuthAPIService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(
    authAPIService : AuthAPIService
  ) { }

}

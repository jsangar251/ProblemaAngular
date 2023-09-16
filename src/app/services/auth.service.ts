import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogged$: Observable<boolean> = this._isLogged.asObservable();

  constructor() { 
    console.log("me creo"); 
  }

  login() {  
    console.log(this._isLogged.value);
    this._isLogged.next(true);
  }
}

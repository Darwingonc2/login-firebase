import { Injectable } from '@angular/core';
import {FirebaseErrorCodeEnum} from "../utils/firebase-error-code";

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string){
    switch(code){
      //el correo ya existe
      case FirebaseErrorCodeEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      //contraseña debil
      case FirebaseErrorCodeEnum.WeakPassword:
        return 'La contraseña es débil';

      //correo invalido
      case FirebaseErrorCodeEnum.InvalidEmail:
        return 'El correo es invalido';

      //contraseña incorrecta
      case FirebaseErrorCodeEnum.WrongPassword:
        return 'La contraseña es incorrecta';

      //correo invalido
      case FirebaseErrorCodeEnum.UserNotFound:
        return 'El correo no existe';
      default:
        return 'Error desconocido'
    }
  }
}

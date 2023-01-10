import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FirebaseCodeErrorService} from "../../services/firebase-code-error.service";

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private router: Router,
              private firebaseError: FirebaseCodeErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if(password !== repetirPassword){
      this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'ERROR');
        return;
    }

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() =>{
      this.verificarCorreo();
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'ERROR');
    })
  }

  verificarCorreo(){
    this.afAuth.currentUser.then(user => user?.sendEmailVerification()).then(()=>{
      this.loading = false;
      this.toastr.success('El usuario fué registrado con éxito', 'Usuario registrado')
      this.toastr.info('Le enviamos un correo electrónico para su verificación', 'Usuario registrado')
      this.router.navigate(['/login']);
    })
  }



}

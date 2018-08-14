import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
// import * as swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup

  constructor( public userService: UsuarioService,
               public router: Router ) { }

  ngOnInit() {
    init_plugins();
    //VALIDACIONES DEL FORMULARIO
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2') });
  }

  sonIguales(campo1: string, campo2: string){
    return (group: FormGroup) =>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      
      if (pass1 === pass2){
        return null;
      } else{
        return {
          sonIguales: true
        };
      }

    }
  }

  registrarUsuario(){
    if (this.forma.invalid){
      return;
    }

    if ( !this.forma.value.condiciones ){
      console.log("Debe aceptar las condiciones");
      // swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    console.log(this.forma.value);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this.userService.crearUsuario(usuario).subscribe( resp =>{
      console.log(resp);
      this.router.navigate(['/login']);
    })
    
  }

}

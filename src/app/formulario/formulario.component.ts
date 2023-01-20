import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{

  miFormularioValidado:FormGroup=new FormGroup({})
  setModal:boolean=false;
  message:Object={};
  statusCode:Object={};
  constructor(private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.miFormularioValidado=this.formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z0-9]*')])],
    })
    
  }

  get email(){
    return this.miFormularioValidado.get('email');
  }
  get password(){
    return this.miFormularioValidado.get('password');
  }
    async enviarFormulario(){

    // Controlar que el formulario este validado
    if(this.miFormularioValidado.valid){
      axios.post('http://192.168.88.174/Login-Php/index.php',this.miFormularioValidado.value)
      .then((response)=>{
        localStorage.setItem('token',JSON.stringify(response.data));
        this.setModal=true;
        
        if(localStorage.getItem('token')){
          this.message = response.data.message;
          this.statusCode = response.data.status;
        }
      })
      .catch((error)=>{
        console.log(error);
        
      })
      this.miFormularioValidado.reset();
    }
    
    
  }
  closeModal(){
    this.setModal=false;
    //localStorage.removeItem('token');
  }

}

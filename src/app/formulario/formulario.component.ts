import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{

  miFormularioValidado:FormGroup=new FormGroup({})
  
  constructor(private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.miFormularioValidado=this.formBuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]*')])],
    })

  }
  enviarFormulario(){
    // Controlar que el formulario este validado
    if(this.miFormularioValidado.valid){
      console.table(this.miFormularioValidado.value);
      // Limpiar el formulario
      this.miFormularioValidado.reset();
    }
  }

}

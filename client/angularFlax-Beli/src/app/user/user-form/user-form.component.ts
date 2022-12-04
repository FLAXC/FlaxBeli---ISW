import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuariosList:any;
  usuarioInfo:any;
  respUsuario:any;
  submitted = false;
  usuarioForm!: FormGroup;
  idUsuario: number = 0;
  isCreate:boolean=true;
  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
      this.formularioReactive();
      this.listaRestaurantes();
    
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idUsuario=params['id'];
      if(this.idUsuario !=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener mesa a actualizar del API
         this.gService.get('producto',this.idUsuario).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.usuarioInfo=data;
          this.usuarioForm.setValue({
            id:this.usuarioInfo.id,
            email:this.usuarioInfo.email,
            nombre:this.usuarioInfo.nombre,
            role:this.usuarioInfo.role,
            password:this.usuarioInfo.password,
            restaurantes:this.usuarioInfo.restaurantes.map(({id}) => id),
            ordenes:this.usuarioInfo.ordenes.map(({id}) => id),
            facturas:this.usuarioInfo.facturas.map(({id}) => id)
          })
         });
      }

    });
}

//Crear Formulario
formularioReactive(){
  //[null, Validators.required]
  this.usuarioForm=this.fb.group({
    id:[null,null],
    email:[null, Validators.required],
    nombre:[null, Validators.required],
    role: [null, Validators.required],
    password: [null, Validators.required],
    ordenes: [null, Validators.required],
    facturas: [null, Validators.required],
    restaurantes:[null, Validators.required]
  });
 //,Validators.pattern(/^[1-9]\d{6,10}$/)
}

listaRestaurantes() {
  this.usuariosList = null;
  this.gService
    .list('restaurante')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      // console.log(data);
      this.usuariosList = data;
    });
}

public errorHandling = (control: string, error: string) => {
  return this.usuarioForm.controls[control].hasError(error);
};

crearUsuario(): void {
  //Establecer submit verdadero
  this.submitted=true;
  //Verificar validación
  if(this.usuarioForm.invalid){
    return;
  }
  let gFormat:any=this.usuarioForm.get('restaurantes')?.value.map(x=>({['id']: x }));
  this.usuarioForm.patchValue({ restaurantes:gFormat});
  console.log(this.usuarioForm.value);
  //Accion API create enviando toda la informacion del formulario
  this.gService.create('usuario',this.usuarioForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    //Obtener respuesta
    this.respUsuario=data;
    this.router.navigate(['/usuarios/all'],{
      queryParams: {create:'true'}
    });
  });
}

actualizarUsuario(){
  this.submitted=true;
  if(this.usuarioForm.invalid){
    return;
  }
  let gFormat:any=this.usuarioForm.get('restaurantes').value.map(x=>({['id']: x }));
  this.usuarioForm.patchValue({ restaurantes:gFormat});
  console.log(this.usuarioForm.value);
  this.gService.update('usuario',this.usuarioForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    this.respUsuario=data;
    this.router.navigate(['/usuarios/all'],{
      queryParams: {update:'true'}
    });
  });
}
onReset() {
  this.submitted = false;
  this.usuarioForm.reset();
}
onBack() {
  this.router.navigate(['/usuarios/all']);
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}

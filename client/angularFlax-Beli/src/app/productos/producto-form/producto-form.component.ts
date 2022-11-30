import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  productosList:any;
  productoInfo:any;
  respProducto:any;
  submitted = false;
  productoForm!: FormGroup;
  idProducto: number = 0;
  isCreate:boolean=true;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
      this.formularioReactive();
      this.listaRestaurantes();
    
  }

  ngOnInit(): void {
        //Verificar si se envio un id por parametro para crear formulario para actualizar
        this.activeRouter.params.subscribe((params:Params)=>{
          this.idProducto=params['id'];
          if(this.idProducto!=undefined){
            this.isCreate=false;
            this.titleForm="Actualizar";
             //Obtener mesa a actualizar del API
             this.gService.get('producto',this.idProducto).pipe(takeUntil(this.destroy$))
             .subscribe((data:any)=>{
              this.productoInfo=data;
              this.productoForm.setValue({
                id:this.productoInfo.id,
                nombre:this.productoInfo.nombre,
                descripcion:this.productoInfo.descripcion,
                ingredientes:this.productoInfo.ingredientes,
                precio:this.productoInfo.precio,
                estado:this.productoInfo.estado,
                categoria:this.productoInfo.categoria,
                restaurantes:this.productoInfo.restaurantes.map(({id}) => id)
              })
             });
          }
    
        });
  }

    //Crear Formulario
    formularioReactive(){
      //[null, Validators.required]
      this.productoForm=this.fb.group({
        id:[null,null],
        nombre:[null, Validators.required],
        descripcion:[null, Validators.required],
        ingredientes: [null, Validators.required],
        precio: [null, Validators.required,Validators.pattern(/^[1-9]\d{6,10}$/)],
        estado: [null, Validators.required],
        categoria: [null, Validators.required],
        restaurantes:[null, Validators.required]
      });
     
    }
    
    listaRestaurantes() {
      this.productosList = null;
      this.gService
        .list('restaurante')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          // console.log(data);
          this.productosList = data;
        });
    }

    public errorHandling = (control: string, error: string) => {
      return this.productoForm.controls[control].hasError(error);
    };

  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    let gFormat:any=this.productoForm.get('restaurantes')?.value.map(x=>({['id']: x }));
    this.productoForm.patchValue({ restaurantes:gFormat});
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respProducto=data;
      this.router.navigate(['/productos/all'],{
        queryParams: {create:'true'}
      });
    });
  }

  actualizarProducto(){
    this.submitted=true;
    if(this.productoForm.invalid){
      return;
    }
    let gFormat:any=this.productoForm.get('restaurantes').value.map(x=>({['id']: x }));
    this.productoForm.patchValue({ restaurantes:gFormat});
    console.log(this.productoForm.value);
    this.gService.update('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      this.respProducto=data;
      this.router.navigate(['/productos/all'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/productos/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

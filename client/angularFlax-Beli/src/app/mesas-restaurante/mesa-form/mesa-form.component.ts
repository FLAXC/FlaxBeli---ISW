import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})
export class MesaFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList:any;
  mesaInfo:any;
  respMesa:any;
  submitted = false;
  mesaForm!: FormGroup;
  idMesa: number = 0;
  isCreate:boolean=true;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute,private noti: NotificacionService) {
      this.formularioReactive();
      this.listaRestaurantes();
  }

  ngOnInit(): void {
        //Verificar si se envio un id por parametro para crear formulario para actualizar
        this.activeRouter.params.subscribe((params:Params)=>{
          this.idMesa=params['id'];
          if(this.idMesa!=undefined){
            this.isCreate=false;
            this.titleForm="Actualizar";
             //Obtener mesa a actualizar del API
             this.gService.get('mesa',this.idMesa).pipe(takeUntil(this.destroy$))
             .subscribe((data:any)=>{
              this.mesaInfo=data;
              this.mesaForm.setValue({
                id:this.mesaInfo.id,
                codigoMesa:this.mesaInfo.codigoMesa,
                capacidad:this.mesaInfo.capacidad,
                estadoMesa:this.mesaInfo.estadoMesa,
                restauranteId:this.mesaInfo.restauranteId,
              })
             });
             this.noti.mensaje(
              'Mesa',
              'Creación de mesa exitosa!',
              TipoMessage.success
            );
          }
    
        });
  }
    //Crear Formulario
    formularioReactive(){
      //[null, Validators.required]
      this.mesaForm=this.fb.group({
        id:[null,null],
        codigoMesa:[null,null],
        capacidad:[null, Validators.required],
        estadoMesa: [null, Validators.required],
        restauranteId:[null, Validators.required]
      });
      //, Validators.pattern(/^[1-9]\d{6,10}$/)
    }
    listaRestaurantes() {
      this.restaurantesList = null;
      this.gService
        .list('restaurante')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          // console.log(data);
          this.restaurantesList = data;
        });
    }

    public errorHandling = (control: string, error: string) => {
      return this.mesaForm.controls[control].hasError(error);
    };

  crearMesa(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.mesaForm.invalid){
      return;
    }
    
    console.log(this.mesaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respMesa=data;
      this.router.navigate(['/mesas/all'],{
        queryParams: {create:'true'}
      });
    });
  
  }
  actualizarMesa(){
    this.submitted=true;
    if(this.mesaForm.invalid){
      return;
    }
    this.gService.update('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      this.respMesa=data;
      this.router.navigate(['/mesas/all'],{
        queryParams: {update:'true'}
      });
    });
    this.noti.mensaje(
      'Mesa',
      'Actualización de mesa exitosa!',
      TipoMessage.success
    );
  }
  onReset() {
    this.submitted = false;
    this.mesaForm.reset();
  }
  onBack() {
    this.router.navigate(['/mesas/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  hide = true;
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restaurantesList:any;
  usuarioInfo:any;
  respUsuario:any;
  submitted = false;
  usuarioForm!: FormGroup;
  idUsuario: number = 0;
  isCreate:boolean=true;

  constructor(
    private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute, private noti: NotificacionService,
  ) {this.formularioReactive();
    this.listaUsuarios();
  }

  ngOnInit(): void {       
            this.activeRouter.params.subscribe((params:Params)=>{
              this.idUsuario=params['id'];
              if(this.idUsuario!=undefined){
                this.isCreate=false;
                this.titleForm="Actualizar";
                 this.gService.get('usuario',this.idUsuario).pipe(takeUntil(this.destroy$))
                 .subscribe((data:any)=>{
                  this.usuarioInfo=data;
                  this.usuarioForm.setValue({
                    id:this.usuarioInfo.id,
                    email:this.usuarioInfo.email,
                    nombre:this.usuarioInfo.nombre,
                    password:this.usuarioInfo.password,
                    role:this.usuarioInfo.role,
                    restauranteId:this.usuarioInfo.restauranteId,
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
          email:[null,null],
          nombre:[null, Validators.required],
          password:[null, Validators.required],
          role: [null, Validators.required],
          restauranteId:[null, Validators.required]
        });
        //, Validators.pattern(/^[1-9]\d{6,10}$/)
      }

      listaUsuarios() {
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
        return this.usuarioForm.controls[control].hasError(error);
      };

      crearUsuario(): void {
        //Establecer submit verdadero
        this.submitted=true;
        //Verificar validación
        if(this.usuarioForm.invalid){
          return;
        }
        
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
        this.noti.mensaje(
          'Usuario',
          'Creación exitosa!',
          TipoMessage.success
        );
      }

      actualizarUsuario(){
        this.submitted=true;
        if(this.usuarioForm.invalid){
          return;
        }
        this.gService.update('usuario',this.usuarioForm.value)
        .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
          this.respUsuario=data;
          this.router.navigate(['/usuarios/all'],{
            queryParams: {update:'true'}
          });
        });
        this.noti.mensaje(
          'Usuario',
          'Actualización exitosa!',
          TipoMessage.success
        );
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

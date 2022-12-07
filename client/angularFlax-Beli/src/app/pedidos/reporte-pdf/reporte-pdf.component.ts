import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reporte-pdf',
  templateUrl: './reporte-pdf.component.html',
  styleUrls: ['./reporte-pdf.component.css']
})
export class ReportePdfComponent implements  AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mesList: any;
  filtro = new Date().getMonth();
  constructor(private gService: GenericService) { 
    this.listaMeses(); 
  }
  ngAfterViewInit(): void {
    this.inicioTabla(this.filtro);
  }


    //npm install jspdf
    openPDF() {
      //htmlData: id del elemento HTML
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        //Configuración del ancho y alto del Canvas de la imagen
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        //devuelve un data URI,el cual contiene una representación
        // de la imagen en el formato especificado por el parámetro type
        const FILEURI = canvas.toDataURL('image/png');
        //Orientación, unidad, formato
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        //Agregar imagen al PDF
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('reporte.pdf');
      });
    }

    inicioTabla(newValue:any){
      this.filtro=newValue;
      if (this.filtro) {
        //Obtener información del API
        this.gService
          .get('pedido/vProductoTop', this.filtro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {            
            this.datos = data;
          });
      }
    }

    listaMeses() {
      this.mesList = [
        { Value: 1, Text: 'Enero' },
        { Value: 2, Text: 'Febrero' },
        { Value: 3, Text: 'Marzo' },
        { Value: 4, Text: 'Abril' },
        { Value: 5, Text: 'Mayo' },
        { Value: 6, Text: 'Junio' },
        { Value: 7, Text: 'Julio' },
        { Value: 8, Text: 'Agosto' },
        { Value: 9, Text: 'Septiembre' },
        { Value: 10, Text: 'Octubre' },
        { Value: 11, Text: 'Noviembre' },
        { Value: 12, Text: 'Diciembre' },
      ];
    }

}

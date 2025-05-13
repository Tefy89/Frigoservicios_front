import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InformeServicioService } from '../../services/informe-servicio/informe-servicio.service';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


// Define el tipo para un informe
interface Informe {
  informe_servicio_id: number;
  usuario: { usuario_id: number };
  fecha: string;
  hora_ingreso: string;
  hora_salida: string;
  equipo: { modelo: string };
  descripcion_trabajo: string;
  asignacionMaterial: { cantidad_usada: number };
}

@Component({
  selector: 'app-informe-servicio',
  templateUrl: './informe-servicio.component.html',
  styleUrls: ['./informe-servicio.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InformeServicioComponent implements OnInit {
  informeForm: FormGroup;
  informesList: any[] = [];
  equiposList: any[] = [];
  materialesList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private informeServicio: InformeServicioService
  ) {
    this.informeForm = this.fb.group({
      usuario: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_ingreso: [''],
      hora_salida: [''],
      equipo: ['', [Validators.required]],
      descripcion_trabajo: ['', [Validators.required]],
      asignacionMaterial: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cargarEquipos();
    this.cargarMateriales();
    this.cargarInformes();
  }

  // Cargar equipos desde el servicio
  cargarEquipos() {
    this.informeServicio.getEquipos().subscribe(
      (equipos) => {
        this.equiposList = equipos;
        console.log('Equipos cargados:', equipos); // Verificar datos en consola
      },
      (error) => {
        console.error('Error al cargar equipos:', error); // Log de error
        Swal.fire('Error', 'No se pudieron cargar los equipos', 'error');
      }
    );
  }

  // Cargar materiales desde el servicio
  cargarMateriales() {
    this.informeServicio.getMateriales().subscribe(
      (materiales) => {
        this.materialesList = materiales;
        console.log('Materiales cargados:', materiales); // Verificar datos en consola
      },
      (error) => {
        console.error('Error al cargar materiales:', error); // Log de error
        Swal.fire('Error', 'No se pudieron cargar los materiales', 'error');
      }
    );
  }

  // Agregar un nuevo informe
  agregarInforme() {
    if (this.informeForm.valid) {
      const formData = this.informeForm.value;

      this.informeServicio.agregarInforme(formData).subscribe(
        (response) => {
          this.informesList.push(response); // Agregar a la lista local
          this.informeForm.reset();
          Swal.fire('Éxito', 'Informe agregado correctamente', 'success');
        },
        (error) => {
          Swal.fire('Error', 'No se pudo agregar el informe', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error');
    }
  }

  // Eliminar un informe específico
  eliminarInforme(informe_servicio_id: number, index: number) {
    if (isNaN(informe_servicio_id)) {
      console.error('El ID del informe no es válido:', informe_servicio_id);
      Swal.fire('Error', 'ID del informe no válido', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.informeServicio.deleteInforme(informe_servicio_id).subscribe(
          () => {
            this.informesList.splice(index, 1);
            Swal.fire('Eliminado', 'El informe ha sido eliminado', 'info');
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el informe', 'error');
          }
        );
      }
    });
  }
  // Cargar los informes desde el servicio
  cargarInformes() {
    this.informeServicio.getInformes().subscribe(
      (informes) => {
        this.informesList = informes;
        console.log('Informes cargados:', informes);
      },
      (error) => {
        console.error('Error al cargar informes:', error);
        Swal.fire('Error', 'No se pudieron cargar los informes', 'error');
      }
    );
  }


  exportarAInformePDF(informe: any): void {
    const doc = new jsPDF();

    // Logo (opcional, si tienes)
    doc.addImage('assets/images/logo.jpg', 'JPEG', 14, 10, 40, 20);

    // Título
    doc.setFontSize(18);
    doc.setTextColor(0, 123, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Informe de Servicio', 14, 40);

    // Datos como tabla
    const tableRows = [
      ['Usuario ID', informe.usuario?.usuario_id],
      ['Fecha', informe.fecha],
      ['Hora de Ingreso', informe.hora_ingreso],
      ['Hora de Salida', informe.hora_salida],
      ['Equipo', informe.equipo?.modelo],
      ['Descripción', informe.descripcion_trabajo],
      ['Material Asignado', informe.asignacionMaterial?.cantidad_usada],
    ];

    // Usamos autoTable directamente
    autoTable(doc, {
      head: [['Campo', 'Detalle']],
      body: tableRows,
      startY: 50,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [255, 239, 179],
        textColor: 0,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    // Mensaje de agradecimiento al final
    const finalY = (doc as any).lastAutoTable.finalY || 120;
    doc.setTextColor(0, 123, 255);
    doc.setFontSize(12);
    doc.text('Gracias por usar nuestros servicios.', 14, finalY + 10);

    // Fecha de generación
    const fecha = new Date().toLocaleString();
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${fecha}`, 14, finalY + 20);

    // Guardar PDF
    doc.save(`informe_servicio_${informe.informe_servicio_id}.pdf`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialesService } from '../../services/materiales/materiales.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // <-- Importar SweetAlert2

@Component({
    selector: 'app-materiales',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {
    materialForm: FormGroup;
    materiales: any[] = [];
    editando = false;
    materialEditandoId: number | null = null;

    constructor(private fb: FormBuilder, private materialesService: MaterialesService) {
        this.materialForm = this.fb.group({
            nombre_material: ['', Validators.required],
            descripcion: ['', Validators.required],
            disponible: [true]
        });
    }

    ngOnInit(): void {
        this.obtenerMateriales();
    }

    obtenerMateriales(): void {
        this.materialesService.getMateriales().subscribe((data) => {
            this.materiales = data;
        });
    }

    onSubmit(): void {
        if (this.materialForm.invalid) return;

        const material = this.materialForm.value;

        if (this.editando && this.materialEditandoId !== null) {
            this.materialesService.actualizarMaterial(this.materialEditandoId, material).subscribe(() => {
                this.resetForm();
                this.obtenerMateriales();
                Swal.fire('Actualizado', 'El material fue actualizado correctamente', 'success');
            }, () => {
                Swal.fire('Error', 'No se pudo actualizar el material', 'error');
            });
        } else {
            this.materialesService.crearMaterial(material).subscribe(() => {
                this.resetForm();
                this.obtenerMateriales();
                Swal.fire('Éxito', 'Material agregado correctamente', 'success');
            }, () => {
                Swal.fire('Error', 'No se pudo agregar el material', 'error');
            });
        }
    }

    editarMaterial(material: any): void {
        this.materialForm.patchValue(material);
        this.editando = true;
        this.materialEditandoId = material.material_id;
    }

    eliminarMaterial(id: number): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás deshacer esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.materialesService.eliminarMaterial(id).subscribe(() => {
                    this.obtenerMateriales();
                    Swal.fire('Eliminado', 'El material ha sido eliminado', 'info');
                }, () => {
                    Swal.fire('Error', 'No se pudo eliminar el material', 'error');
                });
            }
        });
    }

    resetForm(): void {
        this.materialForm.reset({ disponible: true });
        this.editando = false;
        this.materialEditandoId = null;
    }
}

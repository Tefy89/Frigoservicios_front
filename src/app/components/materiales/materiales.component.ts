import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialesService } from '../../services/materiales/materiales.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-materiales',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent {
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
            });
        } else {
            this.materialesService.crearMaterial(material).subscribe(() => {
                this.resetForm();
                this.obtenerMateriales();
            });
        }
    }

    editarMaterial(material: any): void {
        this.materialForm.patchValue(material);
        this.editando = true;
        this.materialEditandoId = material.material_id;
    }

    eliminarMaterial(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
            this.materialesService.eliminarMaterial(id).subscribe(() => {
                this.obtenerMateriales();
            });
        }
    }

    resetForm(): void {
        this.materialForm.reset({ disponible: true });
        this.editando = false;
        this.materialEditandoId = null;
    }
}

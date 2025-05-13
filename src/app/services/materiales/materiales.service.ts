import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  private apiUrl = 'http://localhost:3000/materiales';

  constructor(private http: HttpClient) { }

  // Obtener todos los materiales
  getMateriales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un material por su ID
  getMaterial(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo material
  crearMaterial(material: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, material);
  }

  // Actualizar un material existente
  actualizarMaterial(id: number, material: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, material);
  }

  // Eliminar un material
  eliminarMaterial(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

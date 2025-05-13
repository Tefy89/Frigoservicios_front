import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de que HttpClientModule esté importado
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Asegúrate de que las rutas estén importadas
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';


import { AppComponent } from './app.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { AsignacionesComponent } from './components/asignaciones/asignaciones.component';
import { InformeServicioComponent } from './components/informe-servicio/informe-servicio.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialesComponent } from './components/materiale/materiales.component';// Importa el SidebarComponent

@NgModule({
  declarations: [
    AsignacionesComponent,
    EquiposComponent,
    InformeServicioComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    TicketsComponent,
    SidebarComponent,
    MaterialesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    TagModule, // Importa HttpClientModule aquí
    RouterModule.forRoot(routes),
  ],
})
export class AppModule { }

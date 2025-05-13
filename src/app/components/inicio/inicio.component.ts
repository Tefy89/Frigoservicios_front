import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-inicio',
  imports: [CarouselModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {


  products = [
    {

      image: 'https://frigoserviciosecuador.com/wp-content/uploads/2025/01/male-worker-fixing-air-conditioner-at-home-1536x1025.jpg'
    },
    {

      image: 'https://img.freepik.com/foto-gratis/personas-tiro-medio-cascos-seguridad_23-2149366668.jpg?ga=GA1.1.766868332.1747017294&semt=ais_hybrid&w=740'
    },
    {

      image: 'https://frigoserviciosecuador.com/wp-content/uploads/2025/01/male-worker-fixing-air-conditioner-at-home-1536x1025.jpg'
    },
    {

      image: 'https://img.freepik.com/foto-gratis/personas-tiro-medio-cascos-seguridad_23-2149366668.jpg?ga=GA1.1.766868332.1747017294&semt=ais_hybrid&w=740'
    },



  ];

  // Opciones de visibilidad y desplazamiento para el carrusel
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 5,
      numScroll: 1
    }
  ];

  comments = [
    {
      author: 'Luis Andrade',
      text: 'Excelente servicio técnico. Mi aire acondicionado quedó como nuevo. Muy profesionales y puntuales.',
      authorImage: 'https://cdn.pixabay.com/photo/2020/04/13/20/48/dog-5040008_1280.jpg'
    },
    {
      author: 'Fernanda Cedeño',
      text: 'Los técnicos fueron muy amables y explicaron todo el proceso de instalación. Recomendado al 100%.',
      authorImage: 'https://cdn.pixabay.com/photo/2020/04/13/20/48/dog-5040008_1280.jpg'
    },
    {
      author: 'Carlos Zambrano',
      text: 'Gracias a FIRGOSERVICIOS por el mantenimiento preventivo. El sistema ahora consume menos energía.',
      authorImage: 'https://cdn.pixabay.com/photo/2020/04/13/20/48/dog-5040008_1280.jpg'
    },
    {
      author: 'Andrea Molina',
      text: 'El personal fue muy cordial y resolvieron un problema con mi sistema de refrigeración rápidamente.',
      authorImage: 'https://cdn.pixabay.com/photo/2020/04/13/20/48/dog-5040008_1280.jpg'
    },
    {
      author: 'Daniel Ríos',
      text: 'Muy satisfecho con la compra de mi nuevo equipo de climatización. Funciona perfectamente y tiene garantía.',
      authorImage: 'https://cdn.pixabay.com/photo/2020/04/13/20/48/dog-5040008_1280.jpg'
    }
  ];

  constructor(private router: Router) { }

  // Función para navegar a la página de reportes
  navigateToReports(): void {
    this.router.navigate(['/tickets']); // Redirige a la ruta de tickets
  }

  // Función para navegar a la página de equipos
  navigateToEquipos(): void {
    this.router.navigate(['/equipos']); // Redirige a la ruta de equipos
  }

}

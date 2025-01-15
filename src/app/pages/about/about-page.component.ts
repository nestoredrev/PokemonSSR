import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class AboutPageComponent implements OnInit {

  // Metadatos dinamicos
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    /**
     * Diferenciar en que plataforma estamos
     * si estamos en el lado del servidor o en el lado del browser.
     * Utilizando SSR no tenemos acceso a las funcionalidades del browser como:
     * navigator, location, window y document.
     * Utilizando SSR todo se ejecuta en el lado del servidor.
     */

    if (isPlatformBrowser(this.platform)) {
      document.title = 'About';
    }
    
    this.title.setTitle('About');
    
    this.meta.updateTag({
      name: 'description',
      content: 'Este mi about page'
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'About page'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Angular, PRO, About Page, Nestor, Curso'
    });

  }

}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  
  // Metadatos dinamicos
  private title = inject(Title);
  private meta = inject(Meta);
  
  ngOnInit(): void {
    
    this.title.setTitle('Contact');
    
    this.meta.updateTag({
      name: 'description',
      content: 'Este mi Contact Page'
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact page'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Angular, PRO, Contact Page, Nestor, Curso'
    });

  }
}

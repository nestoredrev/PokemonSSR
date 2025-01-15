import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class PricingPageComponent implements OnInit {

    // Metadatos dinamicos
    private title = inject(Title);
    private meta = inject(Meta);
    
    ngOnInit(): void {
      
      this.title.setTitle('Pricing');
      
      this.meta.updateTag({
        name: 'description',
        content: 'Este mi Pracing Page'
      });
  
      this.meta.updateTag({
        name: 'og:title',
        content: 'Pracing page'
      });
  
      this.meta.updateTag({
        name: 'keywords',
        content: 'Angular, Angular PRO, Pracing Page, Nestor, Curso'
      });
  
    }

}

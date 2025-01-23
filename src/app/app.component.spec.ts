import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {


  
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;


  /***
     * Para evitar la referencia del nav-bar hay que crear un mock del mismo 
     * ya que el propio componente renderiza sus funcionalidades dentro del AppComponent
     * que no es el caso para realizar esas pruebas en AppComponent
   */
  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>Hola Mundo</h1>`
  })
  class NavBarComponentMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    })
    .overrideComponent(AppComponent, { // para sustituir el nav bar original por el mock
      add: {
        imports:[NavBarComponentMock]
      },
      remove:{
        imports:[NavbarComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
    app = fixture.componentInstance;

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'pokemon-ssr' title`, () => {
    expect(app.title).toEqual('pokemon-ssr');
  });

  it(`should render the navbar and router-outlet`, () => {
    expect( compiled.querySelector('app-navbar') ).not.toBeNull();
    expect( compiled.querySelector('router-outlet') ).toBeTruthy();
  });

});

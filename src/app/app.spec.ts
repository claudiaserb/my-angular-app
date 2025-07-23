// Importăm acum AppComponent din fișierul corect.
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Test 1: Verifică dacă componenta se creează cu succes.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Test 2: Verifică dacă proprietatea 'title' are valoarea corectă.
  it(`should have the 'Hello, world!' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hello, world!');
  });

  // Test 3: Verifică dacă titlul este afișat corect în HTML.
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Căutăm un element h1 și verificăm dacă conține textul nostru.
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, world!');
  });
});

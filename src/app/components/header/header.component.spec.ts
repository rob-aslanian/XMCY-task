import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatBadgeModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([
          { path: 'photos', component: {} as never },
          { path: 'favorites', component: {} as never },
        ]),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 2 buttons', () => {
    const [photos, favorites] = fixture.debugElement.queryAll(By.css('button'));

    expect(photos.nativeElement.textContent).toContain('Photos');
    expect(favorites.nativeElement.textContent).toContain('Favorites');
  });

  it.each`
    testId         | routerPath
    ${'favorites'} | ${'/favorites'}
    ${'photos'}    | ${'/'}
  `('should navigate to $routerPath', ({ testId, routerPath }) => {
    const routerBtn = fixture.debugElement.query(
      By.css(`[data-testid="${testId}-btn"]`)
    ).nativeElement as HTMLElement;

    routerBtn.click();

    expect(router.url).toBe(routerPath);
    expect(routerBtn.className).toContain('active-link');
  });
});

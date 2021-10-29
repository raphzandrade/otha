import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// modules
import { RouterTestingModule } from '@angular/router/testing';

// components
import { DefaultLayoutComponent } from './default-layout.component';
import { HeaderComponent } from '../header/header.component';


describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLayoutComponent, HeaderComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have header', () => {
    const header = fixture.debugElement.query(By.css('.default-layout__header'));

    expect(header).not.toBeNull();
  })

  
  it('Should have router-outlet', () => {
    const router = fixture.debugElement.query(By.css('router-outlet'));

    expect(router).not.toBeNull();
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMagazineComponent } from './create-magazine.component';

describe('CreateMagazineComponent', () => {
  let component: CreateMagazineComponent;
  let fixture: ComponentFixture<CreateMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
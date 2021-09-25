import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineSelectComponent } from './magazine-select.component';

describe('MagazineSelectComponent', () => {
  let component: MagazineSelectComponent;
  let fixture: ComponentFixture<MagazineSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazineSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
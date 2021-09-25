import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMagazineComponent } from './list-magazine.component';

describe('ListMagazineComponent', () => {
  let component: ListMagazineComponent;
  let fixture: ComponentFixture<ListMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
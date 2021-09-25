import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMagazineComponent } from './profile-magazine.component';

describe('ProfileMagazineComponent', () => {
  let component: ProfileMagazineComponent;
  let fixture: ComponentFixture<ProfileMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
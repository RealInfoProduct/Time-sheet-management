import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThmMenuComponent } from './thm-menu.component';

describe('ThmMenuComponent', () => {
  let component: ThmMenuComponent;
  let fixture: ComponentFixture<ThmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThmMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

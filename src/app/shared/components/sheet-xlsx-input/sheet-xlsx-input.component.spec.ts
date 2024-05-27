import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetXlsxInputComponent } from './sheet-xlsx-input.component';

describe('SheetXlsxInputComponent', () => {
  let component: SheetXlsxInputComponent;
  let fixture: ComponentFixture<SheetXlsxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetXlsxInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheetXlsxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganigramComponent } from './organigram.component';

describe('OrganigramComponent', () => {
  let component: OrganigramComponent;
  let fixture: ComponentFixture<OrganigramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganigramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

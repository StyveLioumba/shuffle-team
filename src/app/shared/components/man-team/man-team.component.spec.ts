import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManTeamComponent } from './man-team.component';

describe('ManTeamComponent', () => {
  let component: ManTeamComponent;
  let fixture: ComponentFixture<ManTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

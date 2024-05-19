import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTeamComponent } from './auto-team.component';

describe('AutoTeamComponent', () => {
  let component: AutoTeamComponent;
  let fixture: ComponentFixture<AutoTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

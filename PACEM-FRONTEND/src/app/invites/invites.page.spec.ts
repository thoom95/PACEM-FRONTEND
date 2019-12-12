import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitesPage } from './invites.page';

describe('InvitesPage', () => {
  let component: InvitesPage;
  let fixture: ComponentFixture<InvitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvitesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

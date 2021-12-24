import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NrecipePage } from './nrecipe.page';

describe('NrecipePage', () => {
  let component: NrecipePage;
  let fixture: ComponentFixture<NrecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NrecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

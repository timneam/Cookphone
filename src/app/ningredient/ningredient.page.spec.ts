import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NingredientPage } from './ningredient.page';

describe('NingredientPage', () => {
  let component: NingredientPage;
  let fixture: ComponentFixture<NingredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NingredientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NingredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

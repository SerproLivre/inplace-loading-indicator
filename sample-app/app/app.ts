//our root app component
import {Component, Injectable} from '@angular/core';

//our root app component
import { NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';



import { PraticoUiModule } from '@pratico/ui';

console.log('PPPPPPPPPPPPPP', PraticoUiModule);

export enum eFruits {
    kiwi, banana, apple, cherry
}

@Injectable()
export class Test {
  public eTestFruit: eFruits;

  constructor(){
      this.eTestFruit1 = eFruits.apple;
      this.eTestFruit2 = eFruits.kiwi;
  }
}

@Component({
  selector: 'my-app',
  providers: [Test],
  template: `
    <div  style="position:relative">
      <h3> Banana </h3>
      <h3 *ngIf="test.eTestFruit1==2"> Apple </h3>
      <h3 *ngIf="test.eTestFruit2==eFruits.kiwi"> Kiwi </h3>
      <h3> Cherry </h3>
    </div>
    <table [ngBusy]="busy">
    <thead>
    <th>Nome</th>
    </thead>
    <tbody>
    <tr>
    <td>Abner</td>
    </tr>
    </tbody>
    </table>
    <button (click)="buttonClick()">Click</button>
     <div >
      BLBLBLABLALBABAL
     </div>

     <pratico-spinner spinner="ball" width="50" height="50"></pratico-spinner>
  `,
  directives: []
})
export class App {

  public eFruits = eFruits;   // Solution!!!!! :D
  busy = null;
  constructor(private test: Test) {
    this.name = 'Angular2 (Use Enums!)';
  }

  buttonClick() {
   this.busy = { busy: new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve();
     }, 4000)
    backdrop: false

   };
   })
  }
}



@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, BusyModule, PraticoUiModule.forRoot() ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}

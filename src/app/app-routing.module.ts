import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './components/juego/juego.component';
import { Juego2Component } from './components/juego2/juego2.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/juego",
    pathMatch: "full"
  },
  {
  path: 'juego',
  component: JuegoComponent,
  },
  {
    path: 'juego2',
    component: Juego2Component,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

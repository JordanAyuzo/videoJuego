import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './components/juego/juego.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

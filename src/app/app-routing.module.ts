import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardGuard } from './guards/usuario-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'mensajes', 
    component: MensajesComponent,
    canActivate: [UsuarioGuardGuard],
  },
  {path: '**', pathMatch: 'full', redirectTo: ''}
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

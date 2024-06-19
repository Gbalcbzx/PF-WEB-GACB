import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../pipe/safe-url.pipe';


@NgModule({
  declarations: [
    SafeUrlPipe // Declara tu pipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeUrlPipe // Exporta tu pipe
  ]
})
export class SharedModule { }

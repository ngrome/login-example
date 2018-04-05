import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedComponent } from './logged.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedRoutingModule } from './logged.routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoggedRoutingModule,
  ],
  declarations: [LoggedComponent, ProfileComponent],
})
export class LoggedModule {}

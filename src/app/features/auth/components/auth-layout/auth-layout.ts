import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './auth-layout.html',
  styleUrls: ['./auth-layout.scss']
})
export class AuthLayout {}
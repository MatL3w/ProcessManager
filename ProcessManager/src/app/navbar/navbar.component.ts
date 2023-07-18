import { Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-navbar',
  imports:[RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
 export class NavbarComponent{
 }

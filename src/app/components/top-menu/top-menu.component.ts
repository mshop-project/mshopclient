import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule } from '@angular/router';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, RouterModule, ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})

export class TopMenuComponent {

}

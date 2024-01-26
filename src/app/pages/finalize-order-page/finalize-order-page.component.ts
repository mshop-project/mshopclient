import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-finalize-order-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './finalize-order-page.component.html',
  styleUrl: './finalize-order-page.component.scss'
})
export class FinalizeOrderPageComponent {

}

import { Component } from '@angular/core';
import { data } from '../data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pt1-angular-algolia';
  dogs = data;
}

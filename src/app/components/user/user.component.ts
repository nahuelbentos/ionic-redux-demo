import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user: Usuario;

  constructor() { }

  ngOnInit() {}

}

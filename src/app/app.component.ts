import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  public items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
          label: 'Users',
          //icon: 'pi pi-fw pi-power-off',
          routerLink:"/user/management"
      },
      {
          label: 'Password Reset',
          //icon: 'pi pi-fw pi-power-off',
          routerLink:"/resetpassword"
      }
    ];
  }
  
}

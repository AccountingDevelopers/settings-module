import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccSystemService } from 'ng-accounting'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService) { }

  stepActiveIndex: number = 0
  registerFieldsOptions: any = {}
  users: any[] = []
  mainSettingsModel: MenuItem[] = [
    {
      label: 'Головне'
    },
    {
      label: 'Коди'
    },
    {
      label: 'Реєстрація'
    },
    {
      label: 'Адреси'
    }
  ]

  ngOnInit(): void {
    this.users = this.accSystemService.users
  }
}

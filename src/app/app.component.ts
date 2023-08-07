import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccSystemService } from 'ng-accounting'
import { COMPANY_FIELDS_OPTIONS } from 'node_modules/ng-accounting/assets/constants/company.constants'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService) { }

  stepActiveIndex: number = 0
  users: any[] = []
  currentCompany!: any

  companyOptions: any = {}
  generalCompanyForm: FormGroup = new FormGroup({
    name: new FormGroup({
      short: new FormControl(null),
      full: new FormControl(null)
    }),
    organization: new FormGroup({
      type: new FormControl(null)
    }),
    rnokpp: new FormControl(null),
    edrpou: new FormControl(null),
    occupationalRisk: new FormGroup({
      class: new FormControl(null)
    }),
    economicActivity: new FormGroup({
      type: new FormControl(null)
    }),
    pdv: new FormGroup({
      ipn: new FormControl(null),
      certificate: new FormControl(null)
    }),
    codes: new FormGroup({
      territory: new FormControl(null),
      ownership: new FormControl(null),
      administration: new FormControl(null),
      branch: new FormControl(null),
      kopfg: new FormControl(null),
      katottg: new FormControl(null),
      koatyy: new FormControl(null),
      kfv: new FormControl(null),
      spody: new FormControl(null),
      zkgng: new FormControl(null),
      kved: new FormControl(null),
      tax: new FormControl(null)
    }),
    registration: new FormGroup({
      state: new FormGroup({
        number: new FormControl(null),
        registeredBy: new FormControl(null),
        date: new FormControl(null)
      }),
      pension: new FormGroup({
        number: new FormControl(null),
        codePfy: new FormControl(null)
      }),
      employment: new FormGroup({
        number: new FormControl(null),
      }),
      fcc: new FormGroup({
        number: new FormControl(null),
        accident: new FormControl(null),
        temporaryDisability: new FormControl(null),
      })
    }),
    address: new FormGroup({
      legal: new FormControl(null),
      actual: new FormControl(null),
      post: new FormControl(null)
    }),
    contacts: new FormGroup({
      phone: new FormControl(null),
      fax: new FormControl(null),
      email: new FormControl(null)
    }),
    signatures: new FormGroup({
      head: new FormControl(null),
      chiefAccountant: new FormControl(null),
      cashier: new FormControl(null),
    })
  })

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
    this.currentCompany = this.accSystemService.currentCompany
    
    const data = {
      name: this.currentCompany.name,
      ...this.currentCompany.settings.data
    }

    console.log('COMPANY_FIELDS_OPTIONS', COMPANY_FIELDS_OPTIONS);
    
    
    this.generalCompanyForm.patchValue(data)
  }
}

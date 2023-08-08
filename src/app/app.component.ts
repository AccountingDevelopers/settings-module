import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccCompanyService, AccSystemService, COMPANY_FIELDS_OPTIONS } from 'ng-accounting'
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompanyService: AccCompanyService) { }

  stepActiveIndex: number = 0
  users: any[] = []
  currentCompany!: any

  subscription: Subscription = new Subscription()
  companyOptions: any = COMPANY_FIELDS_OPTIONS
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

    const { kopfg, kved } = this.currentCompany.settings.data.codes
    const codes = {
      ...this.currentCompany.settings.data.codes,
      kopfg: this.findInTree(this.companyOptions.kopfg, kopfg),
      kved: this.findInTree(this.companyOptions.kved, kved)
    }

    const data = {
      ...this.currentCompany.settings.data,
      name: this.currentCompany.name,
      codes: codes
    }

    console.log(this.findInTree(this.companyOptions.kopfg, kopfg));
    this.generalCompanyForm.patchValue(data)
  }

  findInTree(nodes: any[] = [], data: string, parent?: any): any {
    if (!Array.isArray(nodes)) {
      nodes = [nodes]
    }

    for (const node of nodes) {
      if (node.data == data) {
        return node
      } else if (Array.isArray(node.children)) {
        let result = null
        let parentNode = {
          ...node,
          expanded: true,
          parent: parent
        }

        for (let i = 0; result == null && i < node.children.length; i++) {
          result = this.findInTree(node.children[i], data, parentNode)
        }

        return {
          ...result,
          parent: parentNode
        }
      }

      return null
    }
  }

  updateSettings() {
    const data = this.generalCompanyForm.value
    const { kved, kopfg } = data.codes
    data.codes = {
      ...data.codes,
      kved: kved.data,
      kopfg: kopfg.data
    }

    this.currentCompany.name = data.name
    delete data.name
    this.currentCompany.settings.data = data

    this.subscription.add(this.accCompanyService.update(this.currentCompany).subscribe({
      next: () => {
        this.subscription.add(this.accSystemService.getCurrentCompany().subscribe())
      }
    }))
  }
}

import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];
  constructor(private log: LoggingService) {}

  addAccount(nameIn: string, statusIn: string) {
    this.accounts.push({ name: nameIn, status: statusIn });
    this.log.logStatus(statusIn);
  }

  updateAccount(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.log.logStatus(newStatus);
  }
}

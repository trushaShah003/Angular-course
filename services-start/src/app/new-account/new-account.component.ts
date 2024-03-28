import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService],
})
export class NewAccountComponent implements OnInit {
  constructor(
    // private log: LoggingService,
    private accService: AccountsService
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    // console.log('A server status changed, new status: ' + accountStatus);
    // this.log.logStatus(accountStatus);
    this.accService.addAccount(accountName, accountStatus);
  }

  ngOnInit(): void {}
}

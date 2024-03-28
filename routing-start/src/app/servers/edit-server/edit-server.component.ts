import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { canComponentDeactivate } from './can-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, canComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = params['id'];
    });
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] == 1 ? true : false;
      // console.log(this.allowEdit);
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.router.navigate(['../'], { relativeTo: this.route });
    this.changesSaved = true;
  }

  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean> =
    () => {
      if (!this.allowEdit) {
        return true;
      }
      if (
        this.serverName !== this.server.name ||
        (this.serverStatus !== this.server.status && !this.changesSaved)
      ) {
        return confirm('Do you ot want to save the changes you made?');
      } else {
        return true;
      }
    };
}

import { EventEmitter } from '@angular/core';

export class HolderService {
  holderSelected = new EventEmitter<string>();
}

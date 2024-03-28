import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
  standalone: true,
})
export class PlaceHolderDirective {
  constructor(public viewCompRef: ViewContainerRef) {}
}

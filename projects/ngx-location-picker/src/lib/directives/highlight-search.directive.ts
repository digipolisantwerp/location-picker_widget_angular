import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightSearchDirective implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    try {
      const re = new RegExp(args, 'gi');
      return value.replace(re, `<strong>${args}</strong>`);
    } catch (e) {
      // We do nothing.
    }
  }
}

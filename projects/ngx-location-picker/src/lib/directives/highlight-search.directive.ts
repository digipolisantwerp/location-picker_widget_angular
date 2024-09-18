import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightSearchDirective implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    try {
      // Remove malicious characters
      const maliciousCharacters = /[\*\%\;\|\<\>\{\}\[\]\/\\\n\r\?\.\--]/g;
      args = args.replace(maliciousCharacters, "");

      const regEx = new RegExp(args, 'ig');
      return value.replace(regEx, (match) => `<strong>${match}</strong>`);
    } catch (e) {
      // We do nothing.
    }
  }
}

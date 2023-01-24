import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProcesos'
})
export class FilterProcesosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 3)
      return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.dsproceso.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }
  transform2(value: any, arg: any): any {
    if (arg == '' || arg.length < 3)
      return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.nmsecuencia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      }
    };
    return resultPosts;
  }


}

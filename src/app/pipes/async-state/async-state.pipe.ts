import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Pipe({
  name: 'withState',
  standalone: true,
})
export class withStatePipe implements PipeTransform {
  transform(val: any) {
    return isObservable(val)
      ? val.pipe(
          map((value: any) => ({ loading: false, value })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : val;
  }
}

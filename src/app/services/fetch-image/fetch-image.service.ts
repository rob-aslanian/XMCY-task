import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchImageService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  fetchImage(id: number): Observable<SafeUrl> {
    return this.http
      .get(`/images/id/${id}/1920/1080`, {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        })
      );
  }
}

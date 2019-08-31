import {HttpClient} from "@angular/common/http";
import {TranslateLoader} from "@ngx-translate/core";
import {Observable, of} from "rxjs";
import {map, catchError} from "rxjs/operators";

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix: string = "/assets/i18n/", public suffix: string = ".json", public fallback_lang: string ) {}

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Object> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        if (this.fallback_lang )
        {
          return this.http.get(`${this.prefix}en${this.suffix}`);
        }
        else
        {
          return of(error);
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = `${environment.apiUrl}/users`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getSales(uri: string) {
    this.apiUrl = environment.apiUrl + uri;
    console.log(this.apiUrl);
    const options = {
      params: new HttpParams({ fromString: '_page=1&_limit=20' }),
    };
    return this.http.get(this.apiUrl, options);
  }

  updateSale(data: any, uri: string) {
    this.apiUrl = environment.apiUrl + uri;
    console.log(data);
    console.log(this.apiUrl);

    return this.http.put(this.apiUrl, data);
  }

  saveNewSale(data: any, uri: string) {
    this.apiUrl = environment.apiUrl + uri;
    console.log(data);
    console.log(this.apiUrl);

    return this.http.post(this.apiUrl, data);
  }

  removeSale(uri: string) {
    this.apiUrl = environment.apiUrl + uri;
    console.log(this.apiUrl);
    const options = {
      params: new HttpParams({ fromString: '_page=1&_limit=20' }),
    };
    return this.http.delete(this.apiUrl);
  }
}

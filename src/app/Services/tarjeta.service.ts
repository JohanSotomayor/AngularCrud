import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
 private Endpoint = 'https://localhost:44338/'; 
  private ApiEndpoint = 'api/Tarjeta/';

  constructor(private http: HttpClient) { }

  GetLista(): Observable<any> {
   return this.http.get(this.Endpoint+this.ApiEndpoint);
  }
  DeleteLista(id: number): Observable<any>{
    return this.http.delete(this.Endpoint+this.ApiEndpoint+id);
  }
  PostLista(tarjeta: any): Observable<any>{
    return this.http.post(this.Endpoint+this.ApiEndpoint, tarjeta);
  }
PutLista(id:number, tarjeta: any): Observable<any>{
  return this.http.put(this.Endpoint+this.ApiEndpoint+id, tarjeta);

}

}

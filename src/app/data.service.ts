import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//set header to json/
//or try in postman
//bhai postman m array kasi send karunga

export class DataService {

  private baseUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/get/all/movies`);
  }

  getSingleMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/detail`)
  }

  getAllProducer(): Observable<any> {
    return this.http.get(`${this.baseUrl}/producer/get/all/producer`);
  }

  getAllActors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/actor/get/all/actors`);
  }

  addNewActor(actorName: string): Observable<any> {
    const params = new HttpParams()
    .set('actorName', actorName);
    return this.http.post(`${this.baseUrl}/actor/add/actor`, params);
  }
  addNewProducer(producerName: string): Observable<any> {
    const params = new HttpParams()
    .set('producerName', producerName);
    return this.http.post(`${this.baseUrl}/producer/add/producer`, params);
  }

  addNewMovie(data: any): Observable<any> {
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
    /* .set('movieName', data.movieName)
    .set('yearOfRelease', data.yearOfRelease)
    .set('producerName', data.producerName)
    .set('actors', data.actors) */
    return this.http.post(`${this.baseUrl}/movie/add/movie`, data, httpOptions);
  }

  updateMovie(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    /* .set('movieName', data.movieName)
    .set('yearOfRelease', data.yearOfRelease)
    .set('producerId', data.producerId)
    .set('producerName', data.producerName)
    .set('actors', data.actorsName) */
    return this.http.put(`${this.baseUrl}/movie/${data.movieId}/edit`, data, httpOptions)
  }


  deleteMovie(movieId) {
    const params = new HttpParams()
    .set('movieId', movieId)
      return this.http.post(`${this.baseUrl}/movie/delete`, params)
  }
  
}

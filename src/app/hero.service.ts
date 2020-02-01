import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // of(HEROES) returns an Observable<Hero[]>
  // that emits a single value, the array of mock heroes.
  /*getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }*/

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // Tap into the flow of observable values and send a message, via the log() method
        // Tap operator which looks at the observable values, does something with those values,
        // and passes them along.
        // Tap call back doesn't touch the values themselves.
        tap(_ => this.log('fetched heroes')),
        // The catchError operator intercepts an Observable that failed.
        // It passes the error an error handler that can do what it wants with the error.
        // Following handleError method reports the error and
        // then returns a result so that the application keeps working.
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // The backticks (`) define a JavaScript template literal
  // for embedding the id.
  // Mock version with out In Memory Web API
  /*getHero(id: number): Observable<Hero> {
    // TODO: send the message after fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }*/

  /** GET hero by id. Will 404 if id not found */
  // returns an observable of Hero objects
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id =${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

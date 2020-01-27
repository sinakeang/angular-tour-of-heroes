import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // of(HEROES) returns an Observable<Hero[]>
  // that emits a single value, the array of mock heroes.
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message after fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  // The backticks (`) define a JavaScript template literal
  // for embedding the id.
  getHero(id: number): Observable<Hero> {
    // TODO: send the message after fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}

import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  // While you could call getHeroes() in the constructor
  // that's not the best practice.
  // Reserve the constructor for simple initialization
  // such as wiring constructor parameters to properties.
  // The constructor shouldn't do anything.
  // It certainly shouldn't call a function that makes HTTP requests
  // to a remote server as a real data service would.
  // Instead call getHeroes() inside the ngOnInit lifecycle hook and
  // let Angular call ngOnInit() at the appropriate time after constructing
  // a HeroesComponent instance.
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /**
   * Although the component delegates hero deletion to the HeroService,
   * it remains responsible for updating its own list of heroes.
   * The components delete() method immediately removes the hero-to-delete
   * from that list, anticipating that the HeroService will succeed on the server.
   *
   * There is nothing for the component to do with the Observable returned
   * by heroService.delete() but it must subscribe anyway.
   *
   * If we don't subscribe, the service will not send the delete request to the server.
   * Observable does nothing until something subscribes.
   */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

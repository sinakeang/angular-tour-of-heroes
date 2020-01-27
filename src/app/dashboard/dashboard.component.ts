import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      // returns the sliced list of heroes at positions 1 and 5
      // returning only four of the top heroes
      // 2nd, 3rd, 4th, 5th
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}

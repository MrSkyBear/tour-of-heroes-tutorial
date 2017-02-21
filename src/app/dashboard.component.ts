import { Component } from '@angular/core';
import { HeroService } from './services/hero.service';
import { OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
	moduleId: module.id,
	selector: 'my-dashboard',
	templateUrl: './html-templates/dashboard.component.html',
	styleUrls: [ './css/dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HeroSearchService } from './services/heroes-search.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: './html-templates/heroes-search.component.html',
  styleUrls: [ './css/heroes-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroSearchService: HeroSearchService, private router: Router) {}
  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // wait 300ms after each keystroke before considering the term
  // ignore if next search term is same as previous
  // switch to new observable each time the term changes
  // return the http search observable
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()   
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}

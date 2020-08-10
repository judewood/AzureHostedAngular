import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  private name:string = '';;

  constructor(private route: ActivatedRoute,) {
    console.log('games comp');
    
   }

   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      console.log(this.name);
    });
  }

}

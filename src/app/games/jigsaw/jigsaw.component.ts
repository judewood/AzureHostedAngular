import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jigsaw',
  templateUrl: './jigsaw.component.html',
  styleUrls: ['./jigsaw.component.scss']
})
export class JigsawComponent implements OnInit {

  constructor() { 
    console.log('jigsaw comp');
  }

  ngOnInit(): void {
  }

}

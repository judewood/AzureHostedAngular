import { Component, OnInit, HostListener } from '@angular/core';
import { Piece, Guess, GameStatus, IGuess, IconSet, IconsSets } from './dtos';
import { LogService, UtilsService, ArrayUtilsService } from '../../core/services';

@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.scss']
})
export class DecoderComponent implements OnInit {
  public target: Piece[] = [];
  public src: Piece[] = [];

  public greenTick: string ='';
  public amberTick: string = '';
  public blankImage: string = '';

  public guess: Guess | undefined;
  public prevGuesses: IGuess[] = [];
  public solution: string[] = [];
  public solutionLength = 4;
  public thetarget: string = '';
  public gameStatus: GameStatus | undefined;
  public maxGuesses = 10;
  public sourceLength = 8;
  public iconSets: IconSet[];
  public iconSetDirectory = 'emoticons';
  public baseUrl = 'assets/images/';
  public guessIsComplete = false;
  public peek :string;
  public guessImg: string;
  public doneImg: string;

  constructor(private logService: LogService,
              private utilsService: UtilsService,
              private arrayUtilsService: ArrayUtilsService) {
    this.iconSets = IconsSets;
    this.setImagePaths();
    this.gameStatus = { gameComplete: false, playerHasWon: false, playerHasLost: false };
    this.peek = this.baseUrl + 'peek.png';
    this.guessImg = this.baseUrl + 'guess.png';
    this.doneImg = this.baseUrl + 'done.png';
  }

  ngOnInit() {
    this.newGame();
  }

get gameComplete(): boolean  {
  if(this.gameStatus == null) {return false;}
  return this.gameStatus.gameComplete;

}
  resetSource() {
    const basePath = `${this.baseUrl}${this.iconSetDirectory}/src`;
    this.src = [];
    for (let i = 0; i < this.sourceLength; ++i) {
      const piece: Piece = {
        id: 'src' + i.toString(),
        filePath: basePath + i.toString() + '.png'
      };
      this.src.push(piece);
    }
  }

  cheat(itemId: string) {
    if(this.guess == null) {return; }
    const targetIndex: number = this.getTargetIndex(itemId);
    for (let i = 0; i < this.sourceLength; ++i) {
      if (this.src[i].filePath === this.solution[targetIndex]) {
        this.target[targetIndex].filePath = this.src[i].filePath;
        this.guess.srcIndexes[targetIndex] = i;
        break;
      }
    }
  }

  resetTarget() {
    this.target = [];
    for (let i = 0; i < this.solutionLength; ++i) {
      const piece: Piece = {
        id: 'target' + i.toString(),
        filePath: this.blankImage
      };
      this.target.push(piece);
    }
  }

  public setImagePaths() {
    this.logService.info(`baseUrl` + this.baseUrl);
    this.blankImage = `${this.baseUrl}whitespot.png`;
    this.logService.info(this.blankImage);
    this.greenTick = `${this.baseUrl}greentick.png`;
    this.amberTick = `${this.baseUrl}ambertick.png`;
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event:  Event ){
    event.stopPropagation();
    event.preventDefault();
   this.thetarget = (<HTMLInputElement>event.target).id;
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event:  Event ){
    event.stopPropagation();
    event.preventDefault();
   this.thetarget = (<HTMLInputElement>event.target).id;
  }

  @HostListener('dragend', ['$event'])
  public onDrop(event: Event | DragEvent) {

    event.preventDefault();
    event.stopPropagation();
  const srcId = (<HTMLInputElement>event.target).id;
    const targetIndex = Number(this.thetarget.substring(6));
    this.logService.debug(`onDrop called with srcId: ${srcId} , targetIndex ${targetIndex}`);
    this.updateGuess(srcId, targetIndex);
  }

  @HostListener('dragstart', ['$event'])
  public 'onDragStart'(event: Event | DragEvent) {
  }

  public updateGuess(srcId: string, targetIndex: number) {
    if(this.guess == null) {return; }
    this.logService.debug(`updateGuess called with srcId: ${srcId} , targetIndex ${targetIndex}`);
    const srcIndex = this.getSrcIndex(srcId);
    if (this.duplicateDetected(srcIndex)) { return; }
    this.guess.srcIndexes[targetIndex] = srcIndex;
    this.target[targetIndex].filePath = this.src[srcIndex].filePath;
  }

  public checkGuessComplete() {
    if(this.guess == null) {return; }
    if (this.guess.srcIndexes.some(p => p === -1)) {
      this.guessIsComplete = false;
      return;
    }
    this.guessIsComplete = true;
  }

  
  public srcImageClicked(srcId: string) {
    this.logService.debug(`srcImageClicked called with srcId: ${srcId}`);
    if (this.gameStatus == null || this.guess == null) { return; }
    if (this.gameStatus.gameComplete) { return; }
    const targetIndex = this.guess.srcIndexes.indexOf(-1);
    if(targetIndex == null) {return;}
    if (targetIndex > -1) {
      this.updateGuess(srcId, targetIndex);
    }
  }

  public targetImageClicked(targetId: string) {
    if (this.gameStatus == null || this.guess == null) { return; }
    if (this.gameStatus.gameComplete) { return; }
    const targetIndex = this.getTargetIndex(targetId);
    if(targetIndex == null) {return;}
    if(targetIndex == null) {return;}
    this.guess.srcIndexes[targetIndex] = -1;
    this.target[targetIndex].filePath = this.blankImage;
  }

  public showPrevGuesses(): boolean {
    return ArrayUtilsService.ArrayHasValue(this.prevGuesses);
  }

  clearSolution() {
    this.logService.debug(`clearSolution`);
    this.solution = [];
    for (let i = 0; i < this.solutionLength; ++i) {
      this.solution.push('');
    }
  }

  populateSolution() {
    this.logService.debug(`populateSolution`);
    for (let i = 0; i < this.solutionLength; ++i) {
      let isDuplicate = true;
      while (isDuplicate) {
        const rand = Math.floor(Math.random() * 8);
        if (this.solution.every(p => p !== this.src[rand].filePath)) {
          this.solution[i] = this.src[rand].filePath;
          isDuplicate = false;
        }
      }
    }
  }

  duplicateDetected(srcIndex: number): boolean {
    if (this.guess == null) { return false; }
    let result = false;
    if (this.guess.srcIndexes.indexOf(srcIndex) >= 0) {
      this.logService.debug(`duplicateDetected`);
      result = true;
    }
    
    return result;
  }

  getSrcIndex(id: string): number {
    return (Number(id.substring(3)));
  }

  getTargetIndex(id: string): number {
    return (Number(id.substring(6)));
  }

  processGuess(event : Event) {
    this.checkGuessComplete();
    if(!this.guessIsComplete) { return;}
    if(this.gameStatus == null) {return;}
    this.checkGuess();
    this.updatePreviousGuesses();
    if(this.guess == null) {return; }
    if (this.guess.redCount >= this.solutionLength) {
      this.gameStatus.playerHasWon = true;
      this.freezeGame();
      return;
    }
    if (this.prevGuesses.length >= this.maxGuesses) {
      this.gameStatus.playerHasLost = true;
      this.freezeGame();
      return;
    }

    this.resetTarget();
    this.guess = new Guess(this.solutionLength);
  }

  public checkGuess() {
    if(this.guess == null) {return;}
    let redCount = 0;
    let whiteCount = 0;
    for (let i = 0; i < this.solutionLength; ++i) {
      const filePathTocheck = this.src[this.guess.srcIndexes[i]].filePath;
      if (filePathTocheck === this.solution[i]) {
        redCount++;
      } else if (this.solution.some(p => p === filePathTocheck)) {
        whiteCount++;
      }
    }
    if(this.guess != null) {
    this.guess.redCount = redCount;
    this.guess.whiteCount = whiteCount;
  }
}

  public changeIconSet(item: IconSet) {
    if (item.value === this.iconSetDirectory) {
      return;
    }
    this.iconSetDirectory = item.value;
    this.newGame();
  }
  updatePreviousGuesses() {
    if(this.guess == null) {return; }
    const guessCopy = this.guess.clone(this.solutionLength);
    this.prevGuesses.unshift(guessCopy);
  }

  newGame() {
    this.logService.debug(`newGame`);
    this.guess = new Guess(this.solutionLength);
    this.gameStatus =  { gameComplete: false, playerHasWon: false, playerHasLost: false };
    this.prevGuesses = [];
    this.resetSource();
    this.resetTarget();
    this.clearSolution();
    this.populateSolution();
  }

  freezeGame() {
    if(this.gameStatus == null) {return;}
    this.gameStatus.gameComplete = true;
  }
}



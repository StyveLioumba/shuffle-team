import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.scss'
})
export class StadiumComponent implements AfterViewInit {

  @ViewChild('canvas', {static: false}) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
  }


}

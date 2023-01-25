import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-prescription-pad',
  templateUrl: './prescription-pad.page.html',
  styleUrls: ['./prescription-pad.page.scss'],
})
export class PrescriptionPadPage implements OnInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number | undefined;
  saveY: number | undefined;
  drawArray: any = [];
  index: number = -1;

  selectedColor = '#00000';
  colors = [
    { color: '#9e2956', name: 'Brown' },
    { color: '#c2281d', name: 'Red' },
    { color: '#de722f', name: 'Orange' },
    { color: '#edbf4c', name: 'Yellow' },
    { color: '#5db37e', name: 'Green' },
    { color: '#459cde', name: 'Blue' },
    { color: '#4250ad', name: 'Dark Blue' },
    { color: '#802fa3', name: 'Purple' },
  ];

  drawing = false;
  lineWidth = 5;

  constructor(private plt: Platform, private utils: UtilsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = this.plt.height() - 300 + '';
  }

  handleState(e: any) {
    this.selectedColor = e.target.value;
    console.log(e.target.value);
  }

  startDrawing(ev: any) {
    this.drawing = true;

    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color: any) {
    this.selectedColor = color;
  }

  moved(ev: any) {
    if (!this.drawing) return;

    var canvasPosition = this.canvasElement.getBoundingClientRect();

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;

    if (ev.type === 'touchmove') {
      this.drawArray.push(
        ctx.getImageData(
          0,
          0,
          this.plt.width() + '',
          this.plt.height() - 300 + ''
        )
      );
      this.index += 1;
    }
  }

  clear() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.plt.width() + '', this.plt.height() - 300 + '');

    this.drawArray = [];
    this.index = -1;
  }

  erase() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
  }

  draw() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
  }

  undo() {
    let ctx = this.canvasElement.getContext('2d');
    if (this.index <= 0) {
      this.clear();
    } else {
      this.index -= 1;
      this.drawArray.pop();
      ctx.putImageData(this.drawArray[this.index], 0, 0);
    }
  }

  save() {
    let dataUrl = this.canvasElement.toDataURL();

    const filename = new Date().getTime() + '.jpeg';

    Filesystem.checkPermissions().then(async (granted) => {
      if (granted.publicStorage === 'granted') {
        await Filesystem.writeFile({
          path: filename,
          directory: Directory.Documents,
          data: dataUrl.split(',')[1],
          recursive: true,
        });

        this.utils.toast('Image saved successfully');
      } else {
        Filesystem.requestPermissions();
      }
    });
  }
}

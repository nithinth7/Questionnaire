import { Component } from '@angular/core';

/*
  Generated class for the AudioInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'audio-input',
  templateUrl: 'audio-input.html'
})
export class AudioInputComponent {

  text: string;

  constructor() {
    console.log('Hello AudioInput Component');
    this.text = 'Hello World';
  }

}

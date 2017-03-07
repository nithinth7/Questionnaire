import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, ViewController, App } from 'ionic-angular';
import { Device } from 'ionic-native';

import { Question } from '../../models/question';
import { AnswerService } from '../../providers/answer-service';
import { FinishPage } from '../finish/finish';

declare var cordova: any;

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class QuestionsPage {

  @ViewChild(Content)
  content: Content;

  @ViewChild('questionsContainer')
  questionsContainerRef: ElementRef;
  questionsContainerEl: HTMLElement;

  progress: number = 0;
  currentQuestion: number = 0;
  questions: Question[];

  // TODO: gather text variables in one place. get values from server?
  txtValues = {
    next: 'NEXT',
    previous: 'PREVIOUS',
    finish: 'FINISH',
    close: 'CLOSE',
  };
  nextBtTxt: string = this.txtValues.next;
  previousBtTxt: string = this.txtValues.close;
  isNextBtDisabled: boolean = true;
  isPreviousBtVisible: boolean = false;
  platform: boolean = false;
  permission: boolean = false;
  audio: boolean = false;
  permissions = null;
  answer = {
      id: null,
      value: null
  }
  iconValues = {
    previous: 'ios-arrow-back',
    close: 'close-circle',
  };
  iconPrevious: string = this.iconValues.close;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private answerService: AnswerService
  ) {
  }

  ionViewDidLoad() {
    this.questions = this.navParams.data;
    this.questionsContainerEl = this.questionsContainerRef.nativeElement;
    var i = 0;
    while (i < this.questions.length) {
        if (this.questions[i].type == 'audio') {
            this.audio = true;
            break;
        }
        i = i + 1;
    }
    if (Device.platform == 'Android') {
        this.permissions = cordova.plugins.permissions;
        this.platform = true;
        if (this.audio == true) {
            this.checkPermission();
        }
    } else {
        this.platform = false;
    }
    this.setCurrentQuestion();
  }
  checkPermission() {
      this.permissions.hasPermission(this.permissions.RECORD_AUDIO,
          (status) => {
              if (!status.hasPermission) {
                  //alert('no permission');
                  var errorCallback = function () {
                      //alert('audio permission is not turned on');
                  }
                  this.permissions.requestPermission(
                      this.permissions.RECORD_AUDIO,
                      (status) => {
                          if (!status.hasPermission) {
                              errorCallback();
                          } else {
                              this.permission = true;
                              //alert('Permission granted - requestpermission:' + this.permission)
                          }
                      },
                      errorCallback);
              } else {
                  this.permission = true;
              }
              //alert('value:' + value)
          },
          null);
  }
  setCurrentQuestion(value = 0) {
      //alert('Permission:' + this.permission);
      var qnno: number = this.currentQuestion + value;

      if (this.platform == false) {
          while (this.questions[this.currentQuestion + value].type == 'audio') {
              this.answer.id = this.questions[this.currentQuestion + value].id;
              this.answer.value = 'Platform not supported';
              this.answerService.add(this.answer);
              if (value <= -1) {
                  value = value - 1;
              } else {
                  value = value + 1;
              }
              if (this.currentQuestion + value < 0)
              {
                  value = 0;
              }
              if (this.currentQuestion + value == this.questions.length) {
                  break;
              }
          }
      } 
    const min = !(this.currentQuestion + value < 0);
    const max = !(this.currentQuestion + value >= this.questions.length);
    const finish = (this.currentQuestion + value === this.questions.length);
    const back = (this.currentQuestion + value === -1);
    

    if (min && max) {
      this.content.scrollToTop(200);

      this.currentQuestion = this.currentQuestion + value;
      this.setProgress();

      this.questionsContainerEl.style.transform =
        `translateX(-${this.currentQuestion * 100}%)`;

      this.iconPrevious = !this.currentQuestion
        ? this.iconValues.close
        : this.iconValues.previous;

      this.previousBtTxt = !this.currentQuestion
        ? this.txtValues.close
        : this.txtValues.previous;

      this.nextBtTxt = this.currentQuestion === this.questions.length - 1
        ? this.txtValues.finish
        : this.txtValues.next;

      this.setNextDisabled();
    }
    else if (finish) {
      this.navCtrl.push(FinishPage);
      this.navCtrl.removeView(this.viewCtrl);
    }
    else if (back) {
      this.navCtrl.pop();
    }
  }

  setProgress() {
    const tick = Math.ceil(100 / this.questions.length);
    const percent = Math.ceil(this.currentQuestion * 100 / this.questions.length);
    this.progress = percent + tick;
  }
  getPermission() {
      return this.permission;
  }
  checkAnswer() {
    const id = this.questions[this.currentQuestion].id;
    return this.answerService.check(id);
  }

  setNextDisabled() {
      this.isNextBtDisabled = !this.checkAnswer();
      //alert('nxtDis:'+this.isNextBtDisabled);
  }

  nextQuestion() {
    if (this.checkAnswer()) {
      this.setCurrentQuestion(1);
    }
  }

  onAnswer(event) {
    if (event.id) {
      this.answerService.add(event);
      this.setNextDisabled();
    }
  }

  previousQuestion() {
    this.setCurrentQuestion(-1);
  }
}

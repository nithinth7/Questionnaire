var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionsPage } from '../pages/questions/questions';
import { QuestionComponent } from '../components/question/question';
import { QuestionService } from '../providers/question-service';
import { AnswerService } from '../providers/answer-service';
import { RangeInputComponent } from '../components/range-input/range-input';
import { RadioInputComponent } from '../components/radio-input/radio-input';
import { FinishPage } from '../pages/finish/finish';
import { SliderInputComponent } from '../components/slider-input/slider-input';
import { AudioInputComponent } from '../components/audio-input/audio-input';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            IonicModule.forRoot(MyApp, {
                mode: 'md'
            })
        ],
        declarations: [
            MyApp,
            // Pages
            HomePage,
            QuestionsPage,
            FinishPage,
            // Components
            QuestionComponent,
            RangeInputComponent,
            RadioInputComponent,
            SliderInputComponent,
            AudioInputComponent
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            // Pages
            HomePage,
            QuestionsPage,
            FinishPage,
            // Components
            QuestionComponent,
            RangeInputComponent,
            RadioInputComponent,
            SliderInputComponent,
            AudioInputComponent
        ],
        providers: [
            QuestionService,
            AnswerService,
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
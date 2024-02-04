import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {



  // Dessa forma estamos puchando os dados do arquivo db-data.ts
  courses: Course[] = COURSES;

  // Dessa forma estamos buscando os dados de um observable
  // Isso é importante porque o método onpush "olhará" para as variáveis @input e para os observables
  // courses$: Observable<Course[]>;

  // Dessa forma estamos usando o método .subscribe
  // courses: Course[];

  // Passando o ChangeDetectorRef por parâmetro no construtor
  constructor(private courseService: CoursesService) {

  }



  ngOnInit() {

  }

  onEditCourse() {
    this.courses = [undefined];
    // Ao clicar no botão, estou limpando o array de cursos
    // Isso é a trigger para a destruição do componente course-card component
    // Com isso o ngIf do template terá o valor false e o componente será destruido

  }

  save(course: Course) {
    this.courseService.saveCourse(course)
      .subscribe(
        () => console.log('Course Saved!')
      );

  }



}

// IMPORTANTE
// Quando de trata de observables, tanto o método padrão, quanto método onpush funcionam tranquilamente.
// Usando observables e OnPush é importante usar async pipe para dar o subscribe no observable.
/*
  Relembrando...
  Maneiras de ativar o método OnPush
    @Input (caso não altere dados, criamos uma cópia do objeto)
    Observables (utilizando | async para se inscrever no observable)
*/

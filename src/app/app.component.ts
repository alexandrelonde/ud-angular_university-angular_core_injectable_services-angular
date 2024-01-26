import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  // Dessa forma estamos puchando os dados do arquivo db-data.ts
  // courses = COURSES;

  // Dessa forma estamos buscando os dados de um observable
  // Isso é importante porque o método onpush "olhará" para as variáveis @input e para os observables
  courses$: Observable<Course[]>;

  constructor(private courseService: CoursesService) {

  }

  ngOnInit() {
    this.courses$ = this.courseService.loadCourses();

  }

  onEditCourse() {

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

import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Dessa forma estamos puchando os dados do arquivo db-data.ts
  courses = COURSES;

  constructor(private courseService: CoursesService) {

  }

  ngOnInit() {

  }

  onEditCourse() {
    const course = this.courses[0];

    // spread operator nesse caso está sendo utilizado para criar uma copia de um array de objetos de curso
    const newCourse: any = {...course};

    newCourse.description = 'New Value!';

    // Criamos uma cópia, alteramos o valor da cópia, e depois passamos a cópia para o valor do array
    // Com isso o modo OnPush funciona corretamente, isso porque criamos um novo objeto
    this.courses[0] = newCourse;

  }

  save(course: Course) {
    this.courseService.saveCourse(course)
      .subscribe(
        () => console.log('Course Saved!')
      );

  }



}

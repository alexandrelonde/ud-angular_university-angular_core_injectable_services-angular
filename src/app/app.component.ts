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


  courses = COURSES;

  constructor(private courseService: CoursesService) {

  }

  ngOnInit() {
    
  }

  save(course: Course) {
    this.courseService.saveCourse(course)
      .subscribe(
        () => console.log('Course Saved!')
      );

  }



}

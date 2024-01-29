import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    INJECTOR,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input() type;


    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor(private courseService: CoursesService, /* @Attribute('type') private type: string */) {


    }

    ngOnInit() {
      console.log(this.type);
      // se estou chamando dentro de um método ou dentro do ngOnInit (lifecycle hook) eu tenho que usar this.

    }

    // Passando o novo valor para a descrição do curso -> course.description
    onTitleChanged(newTitle: string) {
      this.course.description = newTitle;

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }


}

/*
  changeDetection: ChangeDetectionStrategy.OnPush
  Acrescentando essa propriedade ao component ao invés de utilizarmos
  o modo padrão de detecção de mudança, utilizamos o OnPush onde o
  componente só verica mudança quando há alteração nos seus valores de entrada

  Em alguns casos .OnPush e o modo padrão podem funcionar da mesma maneira

*/

/*
  @Attribute: posso pensar no Attribute como um Input de valor fixo, funcionando em
  uma dinâmica semelhante ao Input, mas passado dentro de um construtor.
*/

// Caso eu não vá usar o @Attribute, eu uso o decorator @Input e coloco a lógica em ngOnInit

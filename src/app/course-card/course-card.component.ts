import {
  AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    INJECTOR,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
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
export class CourseCardComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked, AfterViewChecked, AfterContentInit, AfterViewInit, DoCheck {

    /*
      Vale lembrar que por mais que seja uma observação simples, que todos esses métodos, lifecycle
      hooks estão sendo implmementados no componente CouseCardComponent, onde é nesse componente que
      estamos chamando os métodos.
    */

    @Input()
    course: Course;

    @Input() type;


    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    /*
      É importante ressaltar que como estamos detectando alterações manualmente, cada component tem seu ChangeDetectorRef.
      O que foi colocado dentro desse component course-card é diferente do que está no app.component.
    */
    constructor(private courseService: CoursesService, /* @Attribute('type') private type: string */) {
      console.log('constructor', this.course);
      // Para criar o componente, é preciso primeiro chamar o construtor e as suas dependências


    }

    ngOnChanges(changes) {
      console.log("ngOnChanges", changes);
      // Esse método só será chamado por uma trigger em que hava uma mudança de dado ou criação de um objeto
      // Se apenas um campo do objeto for mudado, nada irá acontecer
      // Isso é solucionado, criando uma cópia do objeto com o campo (dado) alterado, e então é passado um objeto modificado

      /*
        Esse lifecycle hook é chamado a primeira vez que o Angular se inicia, onde ele é chamado antes
        do ngOnInit e depois posteriormente a cada mudança implementada. E lembrando que a trigger desse método
        é disparada quando um objeto é mudado e não apenas uma propriedade desse objeto.
      */

    }

    ngOnInit() {
      console.log("ngOnInit", this.course);
      // O método ntOnInit é chamado uma única vez, mesmo que há uma nova interação com o Angular enquanto o programa está rodando
      // se estou chamando dentro de um método ou dentro do ngOnInit (lifecycle hook) eu tenho que usar this.
      // IMPORTANTÍSSIMO!!! Eu não posso chamar um lifecycle hook dentro de um outro - isso seria matar sua funcionalidade
      // É aqui que as variáveis são definidas e não no Construtor

    }


    ngDoCheck() {
      console.log("ngDoCheck");
    }


    ngAfterContentInit() {
      console.log("ngAfterContentInit");

    }


    ngAfterViewInit() {
      console.log("ngAfterViewInit");

    }


    ngAfterContentChecked() {
      console.log("ngAfterContentChecked");
      this.course.description = 'ngAfterContentChecked';
      this.course.category = 'ADVANCED';
      // this.course.iconUrl = ''; -> não pode ser alterado por que é um conteúdo dentro de course-card o que gera um loop

      /*
        Esse método é chamado a cada vez que o Angular detecta uma mudança, seja por uma ação executada
        no programa, seja recebendo dados do backend.
        Esse método é interessante para mudar os dados mostrado no template, e não fazer calculos massivos nessa parte.
        Poderiamos fazer aqui tranquilamente a mudança do campo description do curso.
      */
    }

    ngAfterViewChecked() {
      console.log("ngAfterViewChecked");

      /*
        Após verificar o conteúdo do componente, e verificar se há alguma mudança, será verificado
        o template. É visto que após chamar o método AfterContentCheck, é chamado o método
        AfterViewCheck.

        Um caso interessante para se aplicar nesse método é quanod temos vários cursos em uma página e
        vamos aplicar uma lógica de scroll.
      */
    }

    ngOnDestroy() {
      console.log("ngOnDestroy");
      // Lugar para dar o unsubscrite para as conexẽos abertas (observables)
      // Ao usar o .subscribe ao inves do |async, usando o ngOnDestroy para fazer o unsubscribe
      // Lembrando que para esse método entrar em ação eu tenho que criar uma trigger para ele

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


/*
  Vale lembrar que os lifecycle hooks são métodos que estão dentro da classe
  e são chamados automaticamente pelo framework em diferentes momentos do ciclo de
  vida de um componente, permitindo que a lógica específica seja executada em cada
  momento específico.
*/

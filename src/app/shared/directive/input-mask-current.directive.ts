import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive( {
    selector: '[inputMaskCurrent]'
})

export class InputMaskCurrentDirective {
    @Input( 'inputMaskCurrent' ) inputMaskCurrent: string;

    constructor( private el: ElementRef, private renderer: Renderer ) { }

    @HostListener( 'keyup' ) onKeyUp() {
        this.validadeNumber();
    }

    private validadeNumber(): void {
        this.el.nativeElement.value = this.get_numbers( this.inputMaskCurrent );

    }

    private get_numbers( input: string ): any {
        if ( input !== undefined ) {
            if ( typeof input === 'string' ) {
                return input.match( /[0-9.,]+/g );
            } else if ( typeof input === 'number' ) {
                return input;
            }
        }
        return '';
    }
}


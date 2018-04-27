import { TestBed } from '@angular/core/testing';
import { ExampleModule } from '..';
import { ExampleComponent } from './example.component';

describe('Example widget', () => {

    let fixture = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ExampleModule]
        });
        fixture = TestBed.createComponent(ExampleComponent);
    });

    afterEach(() => {
        if (fixture && fixture.nativeElement) {
            document.body.removeChild(fixture.nativeElement);
        }
        fixture = null;
    });

    it('should create an instance of ExampleComponent', () => {
        expect(fixture).toBeTruthy();
    });

});

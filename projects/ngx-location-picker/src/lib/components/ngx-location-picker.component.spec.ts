import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxLocationPickerComponent} from './ngx-location-picker.component';
import {LeafletModule} from '@acpaas-ui/ngx-components/map';

describe('NgxLocationPickerComponent', () => {
    let component: NgxLocationPickerComponent;
    let fixture: ComponentFixture<NgxLocationPickerComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [NgxLocationPickerComponent],
                imports: [
                    HttpClientModule,
                    FormsModule,
                    CommonModule,
                    ReactiveFormsModule,
                    LeafletModule
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxLocationPickerComponent);
        component = fixture.componentInstance;
        component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


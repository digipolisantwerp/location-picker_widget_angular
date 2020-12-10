import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxLocationPickerComponent} from './ngx-location-picker.component';
import {LeafletModule} from '@acpaas-ui/ngx-components/map';
import {HighlightSearchDirective} from '../directives/highlight-search.directive';
import {MAP_SERVICE_PROVIDER} from '../map.provider';
import { LocationViewerModule } from 'ngx-location-viewer';

describe('NgxLocationPickerComponent', () => {

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          NgxLocationPickerComponent,
          HighlightSearchDirective
        ],
        imports: [
          HttpClientModule,
          FormsModule,
          CommonModule,
          ReactiveFormsModule,
          LeafletModule,
          LocationViewerModule
        ],
        providers: [
          MAP_SERVICE_PROVIDER
        ]
      })
      .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should not instantiate leaflet', () => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    component.showMap = false;
    component.ngOnInit();
    expect(component.leafletMap).toBeUndefined();
  });

  it('should instantiate leaflet', () => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    component.ngOnInit();
    expect(component.leafletMap).toBeDefined();
  });

  it('should activate location picking on button click', (done) => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    component.ngOnInit();

    fixture.detectChanges();

    setTimeout(() => {
      const button = fixture.debugElement.nativeElement.querySelector('.button-location-picking');
      button.click();

      expect(component.pickLocationActive).toBeTruthy();
      done();
    }, 0);
  });

  it('should not query values for short text', (done) => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    component.ngOnInit();

    fixture.detectChanges();

    const spy = spyOn(component, 'onInputChange');
    const input = fixture.debugElement.nativeElement.querySelector('input[type=text]');
    input.value = 'fo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should query values', (done) => {
    const fixture = TestBed.createComponent(NgxLocationPickerComponent);
    const component = fixture.componentInstance;
    component.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    component.ngOnInit();

    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input[type=text]');
    input.value = 'generaal armstrongweg';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.foundLocations).not.toBeNull();
      expect(component.foundLocations.length).toEqual(1);
      done();
    }, 2000);
  });
});


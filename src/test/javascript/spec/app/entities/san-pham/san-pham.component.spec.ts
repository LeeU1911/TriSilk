/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TriSilkTestModule } from '../../../test.module';
import { SanPhamComponent } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.component';
import { SanPhamService } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.service';
import { SanPham } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.model';

describe('Component Tests', () => {

    describe('SanPham Management Component', () => {
        let comp: SanPhamComponent;
        let fixture: ComponentFixture<SanPhamComponent>;
        let service: SanPhamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [SanPhamComponent],
                providers: [
                    SanPhamService
                ]
            })
            .overrideTemplate(SanPhamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SanPhamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SanPhamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SanPham(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sanPhams[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

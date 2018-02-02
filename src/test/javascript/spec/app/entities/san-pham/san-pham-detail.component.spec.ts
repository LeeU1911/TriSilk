/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TriSilkTestModule } from '../../../test.module';
import { SanPhamDetailComponent } from '../../../../../../main/webapp/app/entities/san-pham/san-pham-detail.component';
import { SanPhamService } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.service';
import { SanPham } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.model';

describe('Component Tests', () => {

    describe('SanPham Management Detail Component', () => {
        let comp: SanPhamDetailComponent;
        let fixture: ComponentFixture<SanPhamDetailComponent>;
        let service: SanPhamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [SanPhamDetailComponent],
                providers: [
                    SanPhamService
                ]
            })
            .overrideTemplate(SanPhamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SanPhamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SanPhamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SanPham(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sanPham).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

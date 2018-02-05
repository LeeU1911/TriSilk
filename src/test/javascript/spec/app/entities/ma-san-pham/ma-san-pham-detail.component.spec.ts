/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TriSilkTestModule } from '../../../test.module';
import { MaSanPhamDetailComponent } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham-detail.component';
import { MaSanPhamService } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.service';
import { MaSanPham } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.model';

describe('Component Tests', () => {

    describe('MaSanPham Management Detail Component', () => {
        let comp: MaSanPhamDetailComponent;
        let fixture: ComponentFixture<MaSanPhamDetailComponent>;
        let service: MaSanPhamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [MaSanPhamDetailComponent],
                providers: [
                    MaSanPhamService
                ]
            })
            .overrideTemplate(MaSanPhamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaSanPhamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaSanPhamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MaSanPham(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.maSanPham).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

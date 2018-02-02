/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangChiTietDetailComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet-detail.component';
import { HoaDonBanHangChiTietService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.service';
import { HoaDonBanHangChiTiet } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.model';

describe('Component Tests', () => {

    describe('HoaDonBanHangChiTiet Management Detail Component', () => {
        let comp: HoaDonBanHangChiTietDetailComponent;
        let fixture: ComponentFixture<HoaDonBanHangChiTietDetailComponent>;
        let service: HoaDonBanHangChiTietService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangChiTietDetailComponent],
                providers: [
                    HoaDonBanHangChiTietService
                ]
            })
            .overrideTemplate(HoaDonBanHangChiTietDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangChiTietDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangChiTietService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new HoaDonBanHangChiTiet(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.hoaDonBanHangChiTiet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

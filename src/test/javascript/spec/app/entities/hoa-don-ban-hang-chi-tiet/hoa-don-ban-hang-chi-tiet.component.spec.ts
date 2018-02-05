/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangChiTietComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.component';
import { HoaDonBanHangChiTietService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.service';
import { HoaDonBanHangChiTiet } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.model';

describe('Component Tests', () => {

    describe('HoaDonBanHangChiTiet Management Component', () => {
        let comp: HoaDonBanHangChiTietComponent;
        let fixture: ComponentFixture<HoaDonBanHangChiTietComponent>;
        let service: HoaDonBanHangChiTietService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangChiTietComponent],
                providers: [
                    HoaDonBanHangChiTietService
                ]
            })
            .overrideTemplate(HoaDonBanHangChiTietComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangChiTietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangChiTietService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new HoaDonBanHangChiTiet(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.hoaDonBanHangChiTiets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

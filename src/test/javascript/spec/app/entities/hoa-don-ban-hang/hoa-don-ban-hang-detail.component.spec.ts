/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangDetailComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang-detail.component';
import { HoaDonBanHangService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.service';
import { HoaDonBanHang } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.model';

describe('Component Tests', () => {

    describe('HoaDonBanHang Management Detail Component', () => {
        let comp: HoaDonBanHangDetailComponent;
        let fixture: ComponentFixture<HoaDonBanHangDetailComponent>;
        let service: HoaDonBanHangService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangDetailComponent],
                providers: [
                    HoaDonBanHangService
                ]
            })
            .overrideTemplate(HoaDonBanHangDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new HoaDonBanHang(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.hoaDonBanHang).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

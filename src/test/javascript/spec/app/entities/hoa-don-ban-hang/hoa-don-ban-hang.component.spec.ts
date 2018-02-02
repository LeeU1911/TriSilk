/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.component';
import { HoaDonBanHangService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.service';
import { HoaDonBanHang } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.model';

describe('Component Tests', () => {

    describe('HoaDonBanHang Management Component', () => {
        let comp: HoaDonBanHangComponent;
        let fixture: ComponentFixture<HoaDonBanHangComponent>;
        let service: HoaDonBanHangService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangComponent],
                providers: [
                    HoaDonBanHangService
                ]
            })
            .overrideTemplate(HoaDonBanHangComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new HoaDonBanHang(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.hoaDonBanHangs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

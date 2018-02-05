/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangChiTietDialogComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet-dialog.component';
import { HoaDonBanHangChiTietService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.service';
import { HoaDonBanHangChiTiet } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.model';
import { SanPhamService } from '../../../../../../main/webapp/app/entities/san-pham';

describe('Component Tests', () => {

    describe('HoaDonBanHangChiTiet Management Dialog Component', () => {
        let comp: HoaDonBanHangChiTietDialogComponent;
        let fixture: ComponentFixture<HoaDonBanHangChiTietDialogComponent>;
        let service: HoaDonBanHangChiTietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangChiTietDialogComponent],
                providers: [
                    SanPhamService,
                    HoaDonBanHangChiTietService
                ]
            })
            .overrideTemplate(HoaDonBanHangChiTietDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangChiTietDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangChiTietService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoaDonBanHangChiTiet(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hoaDonBanHangChiTiet = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoaDonBanHangChiTietListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoaDonBanHangChiTiet();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hoaDonBanHangChiTiet = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoaDonBanHangChiTietListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TriSilkTestModule } from '../../../test.module';
import { HoaDonBanHangDialogComponent } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang-dialog.component';
import { HoaDonBanHangService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.service';
import { HoaDonBanHang } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang/hoa-don-ban-hang.model';
import { HoaDonBanHangChiTietService } from '../../../../../../main/webapp/app/entities/hoa-don-ban-hang-chi-tiet';

describe('Component Tests', () => {

    describe('HoaDonBanHang Management Dialog Component', () => {
        let comp: HoaDonBanHangDialogComponent;
        let fixture: ComponentFixture<HoaDonBanHangDialogComponent>;
        let service: HoaDonBanHangService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [HoaDonBanHangDialogComponent],
                providers: [
                    HoaDonBanHangChiTietService,
                    HoaDonBanHangService
                ]
            })
            .overrideTemplate(HoaDonBanHangDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoaDonBanHangDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaDonBanHangService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoaDonBanHang(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hoaDonBanHang = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoaDonBanHangListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoaDonBanHang();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hoaDonBanHang = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoaDonBanHangListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

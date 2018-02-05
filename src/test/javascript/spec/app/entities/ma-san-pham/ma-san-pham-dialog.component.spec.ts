/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TriSilkTestModule } from '../../../test.module';
import { MaSanPhamDialogComponent } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham-dialog.component';
import { MaSanPhamService } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.service';
import { MaSanPham } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.model';

describe('Component Tests', () => {

    describe('MaSanPham Management Dialog Component', () => {
        let comp: MaSanPhamDialogComponent;
        let fixture: ComponentFixture<MaSanPhamDialogComponent>;
        let service: MaSanPhamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [MaSanPhamDialogComponent],
                providers: [
                    MaSanPhamService
                ]
            })
            .overrideTemplate(MaSanPhamDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaSanPhamDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaSanPhamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MaSanPham(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.maSanPham = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'maSanPhamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MaSanPham();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.maSanPham = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'maSanPhamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

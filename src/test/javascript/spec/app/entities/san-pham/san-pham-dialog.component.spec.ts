/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TriSilkTestModule } from '../../../test.module';
import { SanPhamDialogComponent } from '../../../../../../main/webapp/app/entities/san-pham/san-pham-dialog.component';
import { SanPhamService } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.service';
import { SanPham } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.model';
import { MaSanPhamService } from '../../../../../../main/webapp/app/entities/ma-san-pham';

describe('Component Tests', () => {

    describe('SanPham Management Dialog Component', () => {
        let comp: SanPhamDialogComponent;
        let fixture: ComponentFixture<SanPhamDialogComponent>;
        let service: SanPhamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [SanPhamDialogComponent],
                providers: [
                    MaSanPhamService,
                    SanPhamService
                ]
            })
            .overrideTemplate(SanPhamDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SanPhamDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SanPhamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SanPham(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.sanPham = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sanPhamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SanPham();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.sanPham = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sanPhamListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

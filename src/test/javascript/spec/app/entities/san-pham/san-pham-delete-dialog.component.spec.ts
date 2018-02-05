/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TriSilkTestModule } from '../../../test.module';
import { SanPhamDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/san-pham/san-pham-delete-dialog.component';
import { SanPhamService } from '../../../../../../main/webapp/app/entities/san-pham/san-pham.service';

describe('Component Tests', () => {

    describe('SanPham Management Delete Component', () => {
        let comp: SanPhamDeleteDialogComponent;
        let fixture: ComponentFixture<SanPhamDeleteDialogComponent>;
        let service: SanPhamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [SanPhamDeleteDialogComponent],
                providers: [
                    SanPhamService
                ]
            })
            .overrideTemplate(SanPhamDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SanPhamDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SanPhamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

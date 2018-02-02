import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaSanPham } from './ma-san-pham.model';
import { MaSanPhamPopupService } from './ma-san-pham-popup.service';
import { MaSanPhamService } from './ma-san-pham.service';

@Component({
    selector: 'jhi-ma-san-pham-dialog',
    templateUrl: './ma-san-pham-dialog.component.html'
})
export class MaSanPhamDialogComponent implements OnInit {

    maSanPham: MaSanPham;
    isSaving: boolean;
    createdDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private maSanPhamService: MaSanPhamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.maSanPham.id !== undefined) {
            this.subscribeToSaveResponse(
                this.maSanPhamService.update(this.maSanPham));
        } else {
            this.subscribeToSaveResponse(
                this.maSanPhamService.create(this.maSanPham));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MaSanPham>>) {
        result.subscribe((res: HttpResponse<MaSanPham>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MaSanPham) {
        this.eventManager.broadcast({ name: 'maSanPhamListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ma-san-pham-popup',
    template: ''
})
export class MaSanPhamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maSanPhamPopupService: MaSanPhamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.maSanPhamPopupService
                    .open(MaSanPhamDialogComponent as Component, params['id']);
            } else {
                this.maSanPhamPopupService
                    .open(MaSanPhamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

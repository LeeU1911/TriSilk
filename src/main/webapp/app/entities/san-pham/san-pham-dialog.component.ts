import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SanPham } from './san-pham.model';
import { SanPhamPopupService } from './san-pham-popup.service';
import { SanPhamService } from './san-pham.service';
import { MaSanPham, MaSanPhamService } from '../ma-san-pham';

@Component({
    selector: 'jhi-san-pham-dialog',
    templateUrl: './san-pham-dialog.component.html'
})
export class SanPhamDialogComponent implements OnInit {

    sanPham: SanPham;
    isSaving: boolean;

    masanphams: MaSanPham[];
    ngayTaoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sanPhamService: SanPhamService,
        private maSanPhamService: MaSanPhamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.maSanPhamService.query()
            .subscribe((res: HttpResponse<MaSanPham[]>) => { this.masanphams = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.sanPham.tenSanPham =
            `${this.masanphams.filter((obj) => obj.id === this.sanPham.maSanPham.id)[0].productId} - ${this.sanPham.ngayTao.year}/${this.sanPham.ngayTao.month}/${this.sanPham.ngayTao.day}`;
        if (this.sanPham.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sanPhamService.update(this.sanPham));
        } else {
            this.sanPham.metConLai = this.sanPham.soMet;
            this.subscribeToSaveResponse(
                this.sanPhamService.create(this.sanPham));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SanPham>>) {
        result.subscribe((res: HttpResponse<SanPham>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SanPham) {
        this.eventManager.broadcast({ name: 'sanPhamListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaSanPhamById(index: number, item: MaSanPham) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-san-pham-popup',
    template: ''
})
export class SanPhamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sanPhamPopupService: SanPhamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sanPhamPopupService
                    .open(SanPhamDialogComponent as Component, params['id']);
            } else {
                this.sanPhamPopupService
                    .open(SanPhamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

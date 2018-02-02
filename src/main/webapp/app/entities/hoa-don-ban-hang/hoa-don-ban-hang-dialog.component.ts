import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { HoaDonBanHangPopupService } from './hoa-don-ban-hang-popup.service';
import { HoaDonBanHangService } from './hoa-don-ban-hang.service';
import { HoaDonBanHangChiTiet, HoaDonBanHangChiTietService } from '../hoa-don-ban-hang-chi-tiet';

@Component({
    selector: 'jhi-hoa-don-ban-hang-dialog',
    templateUrl: './hoa-don-ban-hang-dialog.component.html'
})
export class HoaDonBanHangDialogComponent implements OnInit {

    hoaDonBanHang: HoaDonBanHang;
    isSaving: boolean;

    hoadonbanhangchitiets: HoaDonBanHangChiTiet[];
    ngayBanDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hoaDonBanHangService: HoaDonBanHangService,
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.hoaDonBanHangChiTietService.query()
            .subscribe((res: HttpResponse<HoaDonBanHangChiTiet[]>) => { this.hoadonbanhangchitiets = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.hoaDonBanHang.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hoaDonBanHangService.update(this.hoaDonBanHang));
        } else {
            this.subscribeToSaveResponse(
                this.hoaDonBanHangService.create(this.hoaDonBanHang));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<HoaDonBanHang>>) {
        result.subscribe((res: HttpResponse<HoaDonBanHang>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: HoaDonBanHang) {
        this.eventManager.broadcast({ name: 'hoaDonBanHangListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackHoaDonBanHangChiTietById(index: number, item: HoaDonBanHangChiTiet) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-hoa-don-ban-hang-popup',
    template: ''
})
export class HoaDonBanHangPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoaDonBanHangPopupService: HoaDonBanHangPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hoaDonBanHangPopupService
                    .open(HoaDonBanHangDialogComponent as Component, params['id']);
            } else {
                this.hoaDonBanHangPopupService
                    .open(HoaDonBanHangDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

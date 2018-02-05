import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { HoaDonBanHangChiTietPopupService } from './hoa-don-ban-hang-chi-tiet-popup.service';
import { HoaDonBanHangChiTietService } from './hoa-don-ban-hang-chi-tiet.service';
import { SanPham, SanPhamService } from '../san-pham';

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet-dialog',
    templateUrl: './hoa-don-ban-hang-chi-tiet-dialog.component.html'
})
export class HoaDonBanHangChiTietDialogComponent implements OnInit {

    hoaDonBanHangChiTiet: HoaDonBanHangChiTiet;
    isSaving: boolean;

    sanphams: SanPham[];
    ngayBanDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService,
        private sanPhamService: SanPhamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sanPhamService.query()
            .subscribe((res: HttpResponse<SanPham[]>) => { this.sanphams = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.hoaDonBanHangChiTiet.tongTien = this.hoaDonBanHangChiTiet.soMet * this.hoaDonBanHangChiTiet.donGia;
        if (this.hoaDonBanHangChiTiet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hoaDonBanHangChiTietService.update(this.hoaDonBanHangChiTiet));
        } else {
            this.subscribeToSaveResponse(
                this.hoaDonBanHangChiTietService.create(this.hoaDonBanHangChiTiet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<HoaDonBanHangChiTiet>>) {
        result.subscribe((res: HttpResponse<HoaDonBanHangChiTiet>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: HoaDonBanHangChiTiet) {
        this.eventManager.broadcast({ name: 'hoaDonBanHangChiTietListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSanPhamById(index: number, item: SanPham) {
        return item.id;
    }

    filter(itemList: SanPham[]): SanPham[] {
            let result: SanPham[] = [];
            result = itemList.filter((sanPham) => sanPham.metConLai);
            return result;
    }
}

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet-popup',
    template: ''
})
export class HoaDonBanHangChiTietPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoaDonBanHangChiTietPopupService: HoaDonBanHangChiTietPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hoaDonBanHangChiTietPopupService
                    .open(HoaDonBanHangChiTietDialogComponent as Component, params['id']);
            } else {
                this.hoaDonBanHangChiTietPopupService
                    .open(HoaDonBanHangChiTietDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

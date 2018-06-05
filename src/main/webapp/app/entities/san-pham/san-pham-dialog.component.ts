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
import {NgbDateParserFormatterEsMX} from '../../shared/datepicker.format';
import { NgbDateParserFormatter, NgbDateStruct ,NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {I18n,CustomDatepickerI18n} from '../../shared/datepicker-i18n';

const now = new Date();

@Component({
    selector: 'jhi-san-pham-dialog',
    templateUrl: './san-pham-dialog.component.html',
    providers: [        {provide: NgbDateParserFormatter, useClass: NgbDateParserFormatterEsMX}
    ,I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]

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
        this.sanPham.ngayTao= {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.sanPham.donGia=0;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.sanPham.tenSanPham =this.toDateString();
        this.sanPham.tongTien = this.sanPham.soMet * this.sanPham.donGia;
        if (this.sanPham.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sanPhamService.update(this.sanPham));
        } else {
            this.sanPham.metConLai = this.sanPham.soMet;
            this.subscribeToSaveResponse(
                this.sanPhamService.create(this.sanPham));
        }
    }

    toDateString(){
        var sanPhamId ="";
        if(this.sanPham.maSanPham!=undefined && this.sanPham.maSanPham!=null ){
            sanPhamId=`${this.masanphams.filter((obj) => obj.id === this.sanPham.maSanPham.id)[0].productId}`;
        }
        var day= this.sanPham.ngayTao.day.toString();

        if(day.length<=1)
            day="0"+day;

        var month= this.sanPham.ngayTao.month.toString();

        if(month.length<=1)
            month="0"+month;
         var soMet="";
         if(this.sanPham.soMet!=undefined)
            var soMet=   " - " +this.sanPham.soMet+"m";
        return sanPhamId + " - " + day+month+this.sanPham.ngayTao.year  + soMet ;
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

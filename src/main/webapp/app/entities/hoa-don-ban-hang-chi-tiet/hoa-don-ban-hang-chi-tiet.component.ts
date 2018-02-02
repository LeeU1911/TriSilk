import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { HoaDonBanHangChiTietService } from './hoa-don-ban-hang-chi-tiet.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet',
    templateUrl: './hoa-don-ban-hang-chi-tiet.component.html'
})
export class HoaDonBanHangChiTietComponent implements OnInit, OnDestroy {
hoaDonBanHangChiTiets: HoaDonBanHangChiTiet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.hoaDonBanHangChiTietService.query().subscribe(
            (res: HttpResponse<HoaDonBanHangChiTiet[]>) => {
                this.hoaDonBanHangChiTiets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHoaDonBanHangChiTiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: HoaDonBanHangChiTiet) {
        return item.id;
    }
    registerChangeInHoaDonBanHangChiTiets() {
        this.eventSubscriber = this.eventManager.subscribe('hoaDonBanHangChiTietListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

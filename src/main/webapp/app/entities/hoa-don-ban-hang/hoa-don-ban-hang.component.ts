import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { HoaDonBanHangService } from './hoa-don-ban-hang.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-hoa-don-ban-hang',
    templateUrl: './hoa-don-ban-hang.component.html'
})
export class HoaDonBanHangComponent implements OnInit, OnDestroy {
hoaDonBanHangs: HoaDonBanHang[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hoaDonBanHangService: HoaDonBanHangService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.hoaDonBanHangService.query().subscribe(
            (res: HttpResponse<HoaDonBanHang[]>) => {
                this.hoaDonBanHangs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHoaDonBanHangs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: HoaDonBanHang) {
        return item.id;
    }
    registerChangeInHoaDonBanHangs() {
        this.eventSubscriber = this.eventManager.subscribe('hoaDonBanHangListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

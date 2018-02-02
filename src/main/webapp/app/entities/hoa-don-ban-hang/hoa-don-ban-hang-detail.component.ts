import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { HoaDonBanHangService } from './hoa-don-ban-hang.service';

@Component({
    selector: 'jhi-hoa-don-ban-hang-detail',
    templateUrl: './hoa-don-ban-hang-detail.component.html'
})
export class HoaDonBanHangDetailComponent implements OnInit, OnDestroy {

    hoaDonBanHang: HoaDonBanHang;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hoaDonBanHangService: HoaDonBanHangService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHoaDonBanHangs();
    }

    load(id) {
        this.hoaDonBanHangService.find(id)
            .subscribe((hoaDonBanHangResponse: HttpResponse<HoaDonBanHang>) => {
                this.hoaDonBanHang = hoaDonBanHangResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHoaDonBanHangs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hoaDonBanHangListModification',
            (response) => this.load(this.hoaDonBanHang.id)
        );
    }
}

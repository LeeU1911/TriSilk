import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { HoaDonBanHangChiTietService } from './hoa-don-ban-hang-chi-tiet.service';

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet-detail',
    templateUrl: './hoa-don-ban-hang-chi-tiet-detail.component.html'
})
export class HoaDonBanHangChiTietDetailComponent implements OnInit, OnDestroy {

    hoaDonBanHangChiTiet: HoaDonBanHangChiTiet;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHoaDonBanHangChiTiets();
    }

    load(id) {
        this.hoaDonBanHangChiTietService.find(id)
            .subscribe((hoaDonBanHangChiTietResponse: HttpResponse<HoaDonBanHangChiTiet>) => {
                this.hoaDonBanHangChiTiet = hoaDonBanHangChiTietResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHoaDonBanHangChiTiets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hoaDonBanHangChiTietListModification',
            (response) => this.load(this.hoaDonBanHangChiTiet.id)
        );
    }
}

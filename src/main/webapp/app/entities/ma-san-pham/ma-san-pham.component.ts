import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaSanPham } from './ma-san-pham.model';
import { MaSanPhamService } from './ma-san-pham.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ma-san-pham',
    templateUrl: './ma-san-pham.component.html'
})
export class MaSanPhamComponent implements OnInit, OnDestroy {
maSanPhams: MaSanPham[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private maSanPhamService: MaSanPhamService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.maSanPhamService.query().subscribe(
            (res: HttpResponse<MaSanPham[]>) => {
                this.maSanPhams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMaSanPhams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MaSanPham) {
        return item.id;
    }
    registerChangeInMaSanPhams() {
        this.eventSubscriber = this.eventManager.subscribe('maSanPhamListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

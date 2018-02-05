import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MaSanPham } from './ma-san-pham.model';
import { MaSanPhamService } from './ma-san-pham.service';

@Component({
    selector: 'jhi-ma-san-pham-detail',
    templateUrl: './ma-san-pham-detail.component.html'
})
export class MaSanPhamDetailComponent implements OnInit, OnDestroy {

    maSanPham: MaSanPham;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private maSanPhamService: MaSanPhamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaSanPhams();
    }

    load(id) {
        this.maSanPhamService.find(id)
            .subscribe((maSanPhamResponse: HttpResponse<MaSanPham>) => {
                this.maSanPham = maSanPhamResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaSanPhams() {
        this.eventSubscriber = this.eventManager.subscribe(
            'maSanPhamListModification',
            (response) => this.load(this.maSanPham.id)
        );
    }
}

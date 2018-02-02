import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SanPham } from './san-pham.model';
import { SanPhamService } from './san-pham.service';

@Component({
    selector: 'jhi-san-pham-detail',
    templateUrl: './san-pham-detail.component.html'
})
export class SanPhamDetailComponent implements OnInit, OnDestroy {

    sanPham: SanPham;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sanPhamService: SanPhamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSanPhams();
    }

    load(id) {
        this.sanPhamService.find(id)
            .subscribe((sanPhamResponse: HttpResponse<SanPham>) => {
                this.sanPham = sanPhamResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSanPhams() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sanPhamListModification',
            (response) => this.load(this.sanPham.id)
        );
    }
}

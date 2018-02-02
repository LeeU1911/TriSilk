import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SanPham } from './san-pham.model';
import { SanPhamPopupService } from './san-pham-popup.service';
import { SanPhamService } from './san-pham.service';

@Component({
    selector: 'jhi-san-pham-delete-dialog',
    templateUrl: './san-pham-delete-dialog.component.html'
})
export class SanPhamDeleteDialogComponent {

    sanPham: SanPham;

    constructor(
        private sanPhamService: SanPhamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sanPhamService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sanPhamListModification',
                content: 'Deleted an sanPham'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-san-pham-delete-popup',
    template: ''
})
export class SanPhamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sanPhamPopupService: SanPhamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sanPhamPopupService
                .open(SanPhamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

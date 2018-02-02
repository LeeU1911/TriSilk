import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaSanPham } from './ma-san-pham.model';
import { MaSanPhamPopupService } from './ma-san-pham-popup.service';
import { MaSanPhamService } from './ma-san-pham.service';

@Component({
    selector: 'jhi-ma-san-pham-delete-dialog',
    templateUrl: './ma-san-pham-delete-dialog.component.html'
})
export class MaSanPhamDeleteDialogComponent {

    maSanPham: MaSanPham;

    constructor(
        private maSanPhamService: MaSanPhamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maSanPhamService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'maSanPhamListModification',
                content: 'Deleted an maSanPham'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ma-san-pham-delete-popup',
    template: ''
})
export class MaSanPhamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maSanPhamPopupService: MaSanPhamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.maSanPhamPopupService
                .open(MaSanPhamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

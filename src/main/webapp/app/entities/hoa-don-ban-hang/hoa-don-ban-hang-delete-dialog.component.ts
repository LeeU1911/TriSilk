import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { HoaDonBanHangPopupService } from './hoa-don-ban-hang-popup.service';
import { HoaDonBanHangService } from './hoa-don-ban-hang.service';

@Component({
    selector: 'jhi-hoa-don-ban-hang-delete-dialog',
    templateUrl: './hoa-don-ban-hang-delete-dialog.component.html'
})
export class HoaDonBanHangDeleteDialogComponent {

    hoaDonBanHang: HoaDonBanHang;

    constructor(
        private hoaDonBanHangService: HoaDonBanHangService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoaDonBanHangService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hoaDonBanHangListModification',
                content: 'Deleted an hoaDonBanHang'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hoa-don-ban-hang-delete-popup',
    template: ''
})
export class HoaDonBanHangDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoaDonBanHangPopupService: HoaDonBanHangPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hoaDonBanHangPopupService
                .open(HoaDonBanHangDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

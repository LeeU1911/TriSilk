import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { HoaDonBanHangChiTietPopupService } from './hoa-don-ban-hang-chi-tiet-popup.service';
import { HoaDonBanHangChiTietService } from './hoa-don-ban-hang-chi-tiet.service';

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet-delete-dialog',
    templateUrl: './hoa-don-ban-hang-chi-tiet-delete-dialog.component.html'
})
export class HoaDonBanHangChiTietDeleteDialogComponent {

    hoaDonBanHangChiTiet: HoaDonBanHangChiTiet;

    constructor(
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoaDonBanHangChiTietService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hoaDonBanHangChiTietListModification',
                content: 'Deleted an hoaDonBanHangChiTiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hoa-don-ban-hang-chi-tiet-delete-popup',
    template: ''
})
export class HoaDonBanHangChiTietDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoaDonBanHangChiTietPopupService: HoaDonBanHangChiTietPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hoaDonBanHangChiTietPopupService
                .open(HoaDonBanHangChiTietDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

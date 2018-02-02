import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { HoaDonBanHangService } from './hoa-don-ban-hang.service';

@Injectable()
export class HoaDonBanHangPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private hoaDonBanHangService: HoaDonBanHangService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.hoaDonBanHangService.find(id)
                    .subscribe((hoaDonBanHangResponse: HttpResponse<HoaDonBanHang>) => {
                        const hoaDonBanHang: HoaDonBanHang = hoaDonBanHangResponse.body;
                        if (hoaDonBanHang.ngayBan) {
                            hoaDonBanHang.ngayBan = {
                                year: hoaDonBanHang.ngayBan.getFullYear(),
                                month: hoaDonBanHang.ngayBan.getMonth() + 1,
                                day: hoaDonBanHang.ngayBan.getDate()
                            };
                        }
                        this.ngbModalRef = this.hoaDonBanHangModalRef(component, hoaDonBanHang);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.hoaDonBanHangModalRef(component, new HoaDonBanHang());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    hoaDonBanHangModalRef(component: Component, hoaDonBanHang: HoaDonBanHang): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.hoaDonBanHang = hoaDonBanHang;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

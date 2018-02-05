import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { HoaDonBanHangChiTietService } from './hoa-don-ban-hang-chi-tiet.service';

@Injectable()
export class HoaDonBanHangChiTietPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private hoaDonBanHangChiTietService: HoaDonBanHangChiTietService

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
                this.hoaDonBanHangChiTietService.find(id)
                    .subscribe((hoaDonBanHangChiTietResponse: HttpResponse<HoaDonBanHangChiTiet>) => {
                        const hoaDonBanHangChiTiet: HoaDonBanHangChiTiet = hoaDonBanHangChiTietResponse.body;
                        if (hoaDonBanHangChiTiet.ngayBan) {
                            hoaDonBanHangChiTiet.ngayBan = {
                                year: hoaDonBanHangChiTiet.ngayBan.getFullYear(),
                                month: hoaDonBanHangChiTiet.ngayBan.getMonth() + 1,
                                day: hoaDonBanHangChiTiet.ngayBan.getDate()
                            };
                        }
                        this.ngbModalRef = this.hoaDonBanHangChiTietModalRef(component, hoaDonBanHangChiTiet);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.hoaDonBanHangChiTietModalRef(component, new HoaDonBanHangChiTiet());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    hoaDonBanHangChiTietModalRef(component: Component, hoaDonBanHangChiTiet: HoaDonBanHangChiTiet): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.hoaDonBanHangChiTiet = hoaDonBanHangChiTiet;
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

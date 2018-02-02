import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MaSanPham } from './ma-san-pham.model';
import { MaSanPhamService } from './ma-san-pham.service';

@Injectable()
export class MaSanPhamPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private maSanPhamService: MaSanPhamService

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
                this.maSanPhamService.find(id)
                    .subscribe((maSanPhamResponse: HttpResponse<MaSanPham>) => {
                        const maSanPham: MaSanPham = maSanPhamResponse.body;
                        if (maSanPham.createdDate) {
                            maSanPham.createdDate = {
                                year: maSanPham.createdDate.getFullYear(),
                                month: maSanPham.createdDate.getMonth() + 1,
                                day: maSanPham.createdDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.maSanPhamModalRef(component, maSanPham);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.maSanPhamModalRef(component, new MaSanPham());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    maSanPhamModalRef(component: Component, maSanPham: MaSanPham): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.maSanPham = maSanPham;
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

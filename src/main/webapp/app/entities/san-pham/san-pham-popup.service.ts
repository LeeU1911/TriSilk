import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SanPham } from './san-pham.model';
import { SanPhamService } from './san-pham.service';

@Injectable()
export class SanPhamPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sanPhamService: SanPhamService

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
                this.sanPhamService.find(id)
                    .subscribe((sanPhamResponse: HttpResponse<SanPham>) => {
                        const sanPham: SanPham = sanPhamResponse.body;
                        if (sanPham.ngayTao) {
                            sanPham.ngayTao = {
                                year: sanPham.ngayTao.getFullYear(),
                                month: sanPham.ngayTao.getMonth() + 1,
                                day: sanPham.ngayTao.getDate()
                            };
                        }
                        this.ngbModalRef = this.sanPhamModalRef(component, sanPham);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sanPhamModalRef(component, new SanPham());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sanPhamModalRef(component: Component, sanPham: SanPham): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sanPham = sanPham;
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

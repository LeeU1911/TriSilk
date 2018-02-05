import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { HoaDonBanHangChiTietComponent } from './hoa-don-ban-hang-chi-tiet.component';
import { HoaDonBanHangChiTietDetailComponent } from './hoa-don-ban-hang-chi-tiet-detail.component';
import { HoaDonBanHangChiTietPopupComponent } from './hoa-don-ban-hang-chi-tiet-dialog.component';
import { HoaDonBanHangChiTietDeletePopupComponent } from './hoa-don-ban-hang-chi-tiet-delete-dialog.component';

@Injectable()
export class HoaDonBanHangChiTietResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const hoaDonBanHangChiTietRoute: Routes = [
    {
        path: 'hoa-don-ban-hang-chi-tiet',
        component: HoaDonBanHangChiTietComponent,
        resolve: {
            'pagingParams': HoaDonBanHangChiTietResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHangChiTiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hoa-don-ban-hang-chi-tiet/:id',
        component: HoaDonBanHangChiTietDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHangChiTiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoaDonBanHangChiTietPopupRoute: Routes = [
    {
        path: 'hoa-don-ban-hang-chi-tiet-new',
        component: HoaDonBanHangChiTietPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHangChiTiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hoa-don-ban-hang-chi-tiet/:id/edit',
        component: HoaDonBanHangChiTietPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHangChiTiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hoa-don-ban-hang-chi-tiet/:id/delete',
        component: HoaDonBanHangChiTietDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHangChiTiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

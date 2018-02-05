import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MaSanPhamComponent } from './ma-san-pham.component';
import { MaSanPhamDetailComponent } from './ma-san-pham-detail.component';
import { MaSanPhamPopupComponent } from './ma-san-pham-dialog.component';
import { MaSanPhamDeletePopupComponent } from './ma-san-pham-delete-dialog.component';

@Injectable()
export class MaSanPhamResolvePagingParams implements Resolve<any> {

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

export const maSanPhamRoute: Routes = [
    {
        path: 'ma-san-pham',
        component: MaSanPhamComponent,
        resolve: {
            'pagingParams': MaSanPhamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.maSanPham.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ma-san-pham/:id',
        component: MaSanPhamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.maSanPham.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maSanPhamPopupRoute: Routes = [
    {
        path: 'ma-san-pham-new',
        component: MaSanPhamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.maSanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ma-san-pham/:id/edit',
        component: MaSanPhamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.maSanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ma-san-pham/:id/delete',
        component: MaSanPhamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.maSanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

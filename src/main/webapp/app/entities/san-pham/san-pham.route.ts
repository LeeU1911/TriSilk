import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SanPhamComponent } from './san-pham.component';
import { SanPhamDetailComponent } from './san-pham-detail.component';
import { SanPhamPopupComponent } from './san-pham-dialog.component';
import { SanPhamDeletePopupComponent } from './san-pham-delete-dialog.component';

@Injectable()
export class SanPhamResolvePagingParams implements Resolve<any> {

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

export const sanPhamRoute: Routes = [
    {
        path: 'san-pham',
        component: SanPhamComponent,
        resolve: {
            'pagingParams': SanPhamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.sanPham.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'san-pham/:id',
        component: SanPhamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.sanPham.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sanPhamPopupRoute: Routes = [
    {
        path: 'san-pham-new',
        component: SanPhamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.sanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'san-pham/:id/edit',
        component: SanPhamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.sanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'san-pham/:id/delete',
        component: SanPhamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.sanPham.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

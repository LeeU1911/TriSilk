import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BaoCaoTonKhoComponent } from './bao-cao-ton-kho.component';

@Injectable()
export class BaoCaoTonKhoResolvePagingParams implements Resolve<any> {

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

export const baoCaoTonKhoRoute: Routes = [
    {
        path: 'bao-cao-ton-kho',
        component: BaoCaoTonKhoComponent,
        resolve: {
            'pagingParams': BaoCaoTonKhoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.baoCaoTonKho.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];



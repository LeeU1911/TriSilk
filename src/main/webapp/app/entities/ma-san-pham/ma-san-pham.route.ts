import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MaSanPhamComponent } from './ma-san-pham.component';
import { MaSanPhamDetailComponent } from './ma-san-pham-detail.component';
import { MaSanPhamPopupComponent } from './ma-san-pham-dialog.component';
import { MaSanPhamDeletePopupComponent } from './ma-san-pham-delete-dialog.component';

export const maSanPhamRoute: Routes = [
    {
        path: 'ma-san-pham',
        component: MaSanPhamComponent,
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

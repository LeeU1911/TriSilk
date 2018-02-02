import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SanPhamComponent } from './san-pham.component';
import { SanPhamDetailComponent } from './san-pham-detail.component';
import { SanPhamPopupComponent } from './san-pham-dialog.component';
import { SanPhamDeletePopupComponent } from './san-pham-delete-dialog.component';

export const sanPhamRoute: Routes = [
    {
        path: 'san-pham',
        component: SanPhamComponent,
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

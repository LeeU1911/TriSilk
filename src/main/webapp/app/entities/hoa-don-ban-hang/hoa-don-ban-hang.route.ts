import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HoaDonBanHangComponent } from './hoa-don-ban-hang.component';
import { HoaDonBanHangDetailComponent } from './hoa-don-ban-hang-detail.component';
import { HoaDonBanHangPopupComponent } from './hoa-don-ban-hang-dialog.component';
import { HoaDonBanHangDeletePopupComponent } from './hoa-don-ban-hang-delete-dialog.component';

export const hoaDonBanHangRoute: Routes = [
    {
        path: 'hoa-don-ban-hang',
        component: HoaDonBanHangComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHang.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hoa-don-ban-hang/:id',
        component: HoaDonBanHangDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHang.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoaDonBanHangPopupRoute: Routes = [
    {
        path: 'hoa-don-ban-hang-new',
        component: HoaDonBanHangPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHang.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hoa-don-ban-hang/:id/edit',
        component: HoaDonBanHangPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHang.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hoa-don-ban-hang/:id/delete',
        component: HoaDonBanHangDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'triSilkApp.hoaDonBanHang.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

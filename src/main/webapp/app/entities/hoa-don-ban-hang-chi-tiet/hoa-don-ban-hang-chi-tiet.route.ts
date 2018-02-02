import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HoaDonBanHangChiTietComponent } from './hoa-don-ban-hang-chi-tiet.component';
import { HoaDonBanHangChiTietDetailComponent } from './hoa-don-ban-hang-chi-tiet-detail.component';
import { HoaDonBanHangChiTietPopupComponent } from './hoa-don-ban-hang-chi-tiet-dialog.component';
import { HoaDonBanHangChiTietDeletePopupComponent } from './hoa-don-ban-hang-chi-tiet-delete-dialog.component';

export const hoaDonBanHangChiTietRoute: Routes = [
    {
        path: 'hoa-don-ban-hang-chi-tiet',
        component: HoaDonBanHangChiTietComponent,
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

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TriSilkSharedModule } from '../../shared';
import {
    HoaDonBanHangChiTietService,
    HoaDonBanHangChiTietPopupService,
    HoaDonBanHangChiTietComponent,
    HoaDonBanHangChiTietDetailComponent,
    HoaDonBanHangChiTietDialogComponent,
    HoaDonBanHangChiTietPopupComponent,
    HoaDonBanHangChiTietDeletePopupComponent,
    HoaDonBanHangChiTietDeleteDialogComponent,
    hoaDonBanHangChiTietRoute,
    hoaDonBanHangChiTietPopupRoute,
    HoaDonBanHangChiTietResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...hoaDonBanHangChiTietRoute,
    ...hoaDonBanHangChiTietPopupRoute,
];

@NgModule({
    imports: [
        TriSilkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HoaDonBanHangChiTietComponent,
        HoaDonBanHangChiTietDetailComponent,
        HoaDonBanHangChiTietDialogComponent,
        HoaDonBanHangChiTietDeleteDialogComponent,
        HoaDonBanHangChiTietPopupComponent,
        HoaDonBanHangChiTietDeletePopupComponent,
    ],
    entryComponents: [
        HoaDonBanHangChiTietComponent,
        HoaDonBanHangChiTietDialogComponent,
        HoaDonBanHangChiTietPopupComponent,
        HoaDonBanHangChiTietDeleteDialogComponent,
        HoaDonBanHangChiTietDeletePopupComponent,
    ],
    providers: [
        HoaDonBanHangChiTietService,
        HoaDonBanHangChiTietPopupService,
        HoaDonBanHangChiTietResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkHoaDonBanHangChiTietModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TriSilkSharedModule } from '../../shared';
import {
    HoaDonBanHangService,
    HoaDonBanHangPopupService,
    HoaDonBanHangComponent,
    HoaDonBanHangDetailComponent,
    HoaDonBanHangDialogComponent,
    HoaDonBanHangPopupComponent,
    HoaDonBanHangDeletePopupComponent,
    HoaDonBanHangDeleteDialogComponent,
    hoaDonBanHangRoute,
    hoaDonBanHangPopupRoute,
} from './';

const ENTITY_STATES = [
    ...hoaDonBanHangRoute,
    ...hoaDonBanHangPopupRoute,
];

@NgModule({
    imports: [
        TriSilkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HoaDonBanHangComponent,
        HoaDonBanHangDetailComponent,
        HoaDonBanHangDialogComponent,
        HoaDonBanHangDeleteDialogComponent,
        HoaDonBanHangPopupComponent,
        HoaDonBanHangDeletePopupComponent,
    ],
    entryComponents: [
        HoaDonBanHangComponent,
        HoaDonBanHangDialogComponent,
        HoaDonBanHangPopupComponent,
        HoaDonBanHangDeleteDialogComponent,
        HoaDonBanHangDeletePopupComponent,
    ],
    providers: [
        HoaDonBanHangService,
        HoaDonBanHangPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkHoaDonBanHangModule {}

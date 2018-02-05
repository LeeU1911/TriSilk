import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TriSilkSharedModule } from '../../shared';
import {
    MaSanPhamService,
    MaSanPhamPopupService,
    MaSanPhamComponent,
    MaSanPhamDetailComponent,
    MaSanPhamDialogComponent,
    MaSanPhamPopupComponent,
    MaSanPhamDeletePopupComponent,
    MaSanPhamDeleteDialogComponent,
    maSanPhamRoute,
    maSanPhamPopupRoute,
    MaSanPhamResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...maSanPhamRoute,
    ...maSanPhamPopupRoute,
];

@NgModule({
    imports: [
        TriSilkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaSanPhamComponent,
        MaSanPhamDetailComponent,
        MaSanPhamDialogComponent,
        MaSanPhamDeleteDialogComponent,
        MaSanPhamPopupComponent,
        MaSanPhamDeletePopupComponent,
    ],
    entryComponents: [
        MaSanPhamComponent,
        MaSanPhamDialogComponent,
        MaSanPhamPopupComponent,
        MaSanPhamDeleteDialogComponent,
        MaSanPhamDeletePopupComponent,
    ],
    providers: [
        MaSanPhamService,
        MaSanPhamPopupService,
        MaSanPhamResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkMaSanPhamModule {}

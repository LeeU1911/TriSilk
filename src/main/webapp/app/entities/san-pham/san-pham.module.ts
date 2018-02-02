import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TriSilkSharedModule } from '../../shared';
import {
    SanPhamService,
    SanPhamPopupService,
    SanPhamComponent,
    SanPhamDetailComponent,
    SanPhamDialogComponent,
    SanPhamPopupComponent,
    SanPhamDeletePopupComponent,
    SanPhamDeleteDialogComponent,
    sanPhamRoute,
    sanPhamPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sanPhamRoute,
    ...sanPhamPopupRoute,
];

@NgModule({
    imports: [
        TriSilkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SanPhamComponent,
        SanPhamDetailComponent,
        SanPhamDialogComponent,
        SanPhamDeleteDialogComponent,
        SanPhamPopupComponent,
        SanPhamDeletePopupComponent,
    ],
    entryComponents: [
        SanPhamComponent,
        SanPhamDialogComponent,
        SanPhamPopupComponent,
        SanPhamDeleteDialogComponent,
        SanPhamDeletePopupComponent,
    ],
    providers: [
        SanPhamService,
        SanPhamPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkSanPhamModule {}

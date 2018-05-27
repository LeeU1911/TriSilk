import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TriSilkSharedModule } from '../../shared';
import {
    SanPhamService,
    BaoCaoTonKhoComponent,
    baoCaoTonKhoRoute,
    BaoCaoTonKhoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...baoCaoTonKhoRoute,
];

@NgModule({
    imports: [
        TriSilkSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaoCaoTonKhoComponent,
    ],
    entryComponents: [
        BaoCaoTonKhoComponent,
    ],
    providers: [
        SanPhamService,
        BaoCaoTonKhoResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkBaoCaoTonKhoModule {}

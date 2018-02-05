import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TriSilkMaSanPhamModule } from './ma-san-pham/ma-san-pham.module';
import { TriSilkSanPhamModule } from './san-pham/san-pham.module';
import { TriSilkHoaDonBanHangChiTietModule } from './hoa-don-ban-hang-chi-tiet/hoa-don-ban-hang-chi-tiet.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TriSilkMaSanPhamModule,
        TriSilkSanPhamModule,
        TriSilkHoaDonBanHangChiTietModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkEntityModule {}

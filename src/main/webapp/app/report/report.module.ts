import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TriSilkBaoCaoTonKhoModule } from './bao-cao-ton-kho/bao-cao-ton-kho.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TriSilkBaoCaoTonKhoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TriSilkReportModule {}

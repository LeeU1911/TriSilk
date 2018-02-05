/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TriSilkTestModule } from '../../../test.module';
import { MaSanPhamComponent } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.component';
import { MaSanPhamService } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.service';
import { MaSanPham } from '../../../../../../main/webapp/app/entities/ma-san-pham/ma-san-pham.model';

describe('Component Tests', () => {

    describe('MaSanPham Management Component', () => {
        let comp: MaSanPhamComponent;
        let fixture: ComponentFixture<MaSanPhamComponent>;
        let service: MaSanPhamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TriSilkTestModule],
                declarations: [MaSanPhamComponent],
                providers: [
                    MaSanPhamService
                ]
            })
            .overrideTemplate(MaSanPhamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaSanPhamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaSanPhamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MaSanPham(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.maSanPhams[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { HoaDonBanHang } from './hoa-don-ban-hang.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<HoaDonBanHang>;

@Injectable()
export class HoaDonBanHangService {

    private resourceUrl =  SERVER_API_URL + 'api/hoa-don-ban-hangs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(hoaDonBanHang: HoaDonBanHang): Observable<EntityResponseType> {
        const copy = this.convert(hoaDonBanHang);
        return this.http.post<HoaDonBanHang>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(hoaDonBanHang: HoaDonBanHang): Observable<EntityResponseType> {
        const copy = this.convert(hoaDonBanHang);
        return this.http.put<HoaDonBanHang>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<HoaDonBanHang>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<HoaDonBanHang[]>> {
        const options = createRequestOption(req);
        return this.http.get<HoaDonBanHang[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<HoaDonBanHang[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: HoaDonBanHang = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<HoaDonBanHang[]>): HttpResponse<HoaDonBanHang[]> {
        const jsonResponse: HoaDonBanHang[] = res.body;
        const body: HoaDonBanHang[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to HoaDonBanHang.
     */
    private convertItemFromServer(hoaDonBanHang: HoaDonBanHang): HoaDonBanHang {
        const copy: HoaDonBanHang = Object.assign({}, hoaDonBanHang);
        copy.ngayBan = this.dateUtils
            .convertLocalDateFromServer(hoaDonBanHang.ngayBan);
        return copy;
    }

    /**
     * Convert a HoaDonBanHang to a JSON which can be sent to the server.
     */
    private convert(hoaDonBanHang: HoaDonBanHang): HoaDonBanHang {
        const copy: HoaDonBanHang = Object.assign({}, hoaDonBanHang);
        copy.ngayBan = this.dateUtils
            .convertLocalDateToServer(hoaDonBanHang.ngayBan);
        return copy;
    }
}

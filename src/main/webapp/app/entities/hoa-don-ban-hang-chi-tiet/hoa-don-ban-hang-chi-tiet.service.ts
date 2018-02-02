import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { HoaDonBanHangChiTiet } from './hoa-don-ban-hang-chi-tiet.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<HoaDonBanHangChiTiet>;

@Injectable()
export class HoaDonBanHangChiTietService {

    private resourceUrl =  SERVER_API_URL + 'api/hoa-don-ban-hang-chi-tiets';

    constructor(private http: HttpClient) { }

    create(hoaDonBanHangChiTiet: HoaDonBanHangChiTiet): Observable<EntityResponseType> {
        const copy = this.convert(hoaDonBanHangChiTiet);
        return this.http.post<HoaDonBanHangChiTiet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(hoaDonBanHangChiTiet: HoaDonBanHangChiTiet): Observable<EntityResponseType> {
        const copy = this.convert(hoaDonBanHangChiTiet);
        return this.http.put<HoaDonBanHangChiTiet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<HoaDonBanHangChiTiet>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<HoaDonBanHangChiTiet[]>> {
        const options = createRequestOption(req);
        return this.http.get<HoaDonBanHangChiTiet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<HoaDonBanHangChiTiet[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: HoaDonBanHangChiTiet = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<HoaDonBanHangChiTiet[]>): HttpResponse<HoaDonBanHangChiTiet[]> {
        const jsonResponse: HoaDonBanHangChiTiet[] = res.body;
        const body: HoaDonBanHangChiTiet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to HoaDonBanHangChiTiet.
     */
    private convertItemFromServer(hoaDonBanHangChiTiet: HoaDonBanHangChiTiet): HoaDonBanHangChiTiet {
        const copy: HoaDonBanHangChiTiet = Object.assign({}, hoaDonBanHangChiTiet);
        return copy;
    }

    /**
     * Convert a HoaDonBanHangChiTiet to a JSON which can be sent to the server.
     */
    private convert(hoaDonBanHangChiTiet: HoaDonBanHangChiTiet): HoaDonBanHangChiTiet {
        const copy: HoaDonBanHangChiTiet = Object.assign({}, hoaDonBanHangChiTiet);
        return copy;
    }
}

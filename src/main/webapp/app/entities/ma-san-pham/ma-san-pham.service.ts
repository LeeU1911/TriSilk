import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MaSanPham } from './ma-san-pham.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MaSanPham>;

@Injectable()
export class MaSanPhamService {

    private resourceUrl =  SERVER_API_URL + 'api/ma-san-phams';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(maSanPham: MaSanPham): Observable<EntityResponseType> {
        const copy = this.convert(maSanPham);
        return this.http.post<MaSanPham>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(maSanPham: MaSanPham): Observable<EntityResponseType> {
        const copy = this.convert(maSanPham);
        return this.http.put<MaSanPham>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MaSanPham>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MaSanPham[]>> {
        const options = createRequestOption(req);
        return this.http.get<MaSanPham[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MaSanPham[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MaSanPham = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MaSanPham[]>): HttpResponse<MaSanPham[]> {
        const jsonResponse: MaSanPham[] = res.body;
        const body: MaSanPham[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MaSanPham.
     */
    private convertItemFromServer(maSanPham: MaSanPham): MaSanPham {
        const copy: MaSanPham = Object.assign({}, maSanPham);
        copy.createdDate = this.dateUtils
            .convertLocalDateFromServer(maSanPham.createdDate);
        return copy;
    }

    /**
     * Convert a MaSanPham to a JSON which can be sent to the server.
     */
    private convert(maSanPham: MaSanPham): MaSanPham {
        const copy: MaSanPham = Object.assign({}, maSanPham);
        copy.createdDate = this.dateUtils
            .convertLocalDateToServer(maSanPham.createdDate);
        return copy;
    }
}

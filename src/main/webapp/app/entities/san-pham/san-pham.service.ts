import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SanPham } from './san-pham.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SanPham>;

@Injectable()
export class SanPhamService {

    private resourceUrl =  SERVER_API_URL + 'api/san-phams';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(sanPham: SanPham): Observable<EntityResponseType> {
        const copy = this.convert(sanPham);
        return this.http.post<SanPham>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sanPham: SanPham): Observable<EntityResponseType> {
        const copy = this.convert(sanPham);
        return this.http.put<SanPham>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SanPham>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SanPham[]>> {
        const options = createRequestOption(req);
        return this.http.get<SanPham[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SanPham[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SanPham = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SanPham[]>): HttpResponse<SanPham[]> {
        const jsonResponse: SanPham[] = res.body;
        const body: SanPham[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SanPham.
     */
    private convertItemFromServer(sanPham: SanPham): SanPham {
        const copy: SanPham = Object.assign({}, sanPham);
        copy.ngayTao = this.dateUtils
            .convertLocalDateFromServer(sanPham.ngayTao);
        return copy;
    }

    /**
     * Convert a SanPham to a JSON which can be sent to the server.
     */
    private convert(sanPham: SanPham): SanPham {
        const copy: SanPham = Object.assign({}, sanPham);
        copy.ngayTao = this.dateUtils
            .convertLocalDateToServer(sanPham.ngayTao);
        return copy;
    }
}

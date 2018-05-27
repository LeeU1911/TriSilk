import { BaseEntity } from './../../shared';

export class SanPham implements BaseEntity {
    constructor(
        public id?: number,
        public ngayTao?: any,
        public khoRong?: string,
        public soMet?: number,
        public trongLuong?: number,
        public tenSanPham?: string,
        public donGia?: number,
        public tongTien?: number,
        public metConLai?: number,
        public hdbhchitiets?: BaseEntity[],
        public maSanPham?: BaseEntity,
    ) {
    }
}

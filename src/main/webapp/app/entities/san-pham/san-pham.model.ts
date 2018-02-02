import { BaseEntity } from './../../shared';

export class SanPham implements BaseEntity {
    constructor(
        public id?: number,
        public ngayTao?: any,
        public khoRong?: string,
        public met?: string,
        public trongLuong?: string,
        public tenSanPham?: string,
        public donGia?: string,
        public tongTien?: string,
        public metConLai?: string,
        public hdbhchitiets?: BaseEntity[],
        public maSanPham?: BaseEntity,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class HoaDonBanHangChiTiet implements BaseEntity {
    constructor(
        public id?: number,
        public soMet?: string,
        public donGia?: string,
        public tongTien?: string,
        public hoadonbanhangs?: BaseEntity[],
        public sanPham?: BaseEntity,
    ) {
    }
}

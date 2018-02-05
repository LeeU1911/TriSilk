import { BaseEntity } from './../../shared';

export class HoaDonBanHangChiTiet implements BaseEntity {
    constructor(
        public id?: number,
        public ngayBan?: any,
        public tenKhachHang?: string,
        public soMet?: number,
        public donGia?: number,
        public tongTien?: number,
        public sanPham?: BaseEntity,
    ) {
    }
}

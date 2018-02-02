import { BaseEntity } from './../../shared';

export class HoaDonBanHang implements BaseEntity {
    constructor(
        public id?: number,
        public ngayBan?: any,
        public tongTienHD?: string,
        public hdbhchitiet?: BaseEntity,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class MaSanPham implements BaseEntity {
    constructor(
        public id?: number,
        public productId?: string,
        public createdDate?: any,
        public sanPhams?: BaseEntity[],
    ) {
    }
}

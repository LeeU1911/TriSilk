package com.dinogroup.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A HoaDonBanHang.
 */
@Entity
@Table(name = "hoa_don_ban_hang")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HoaDonBanHang implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ngay_ban")
    private LocalDate ngayBan;

    @Column(name = "tong_tien_hd")
    private String tongTienHD;

    @ManyToOne
    private HoaDonBanHangChiTiet hdbhchitiet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNgayBan() {
        return ngayBan;
    }

    public HoaDonBanHang ngayBan(LocalDate ngayBan) {
        this.ngayBan = ngayBan;
        return this;
    }

    public void setNgayBan(LocalDate ngayBan) {
        this.ngayBan = ngayBan;
    }

    public String getTongTienHD() {
        return tongTienHD;
    }

    public HoaDonBanHang tongTienHD(String tongTienHD) {
        this.tongTienHD = tongTienHD;
        return this;
    }

    public void setTongTienHD(String tongTienHD) {
        this.tongTienHD = tongTienHD;
    }

    public HoaDonBanHangChiTiet getHdbhchitiet() {
        return hdbhchitiet;
    }

    public HoaDonBanHang hdbhchitiet(HoaDonBanHangChiTiet hoaDonBanHangChiTiet) {
        this.hdbhchitiet = hoaDonBanHangChiTiet;
        return this;
    }

    public void setHdbhchitiet(HoaDonBanHangChiTiet hoaDonBanHangChiTiet) {
        this.hdbhchitiet = hoaDonBanHangChiTiet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HoaDonBanHang hoaDonBanHang = (HoaDonBanHang) o;
        if (hoaDonBanHang.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hoaDonBanHang.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HoaDonBanHang{" +
            "id=" + getId() +
            ", ngayBan='" + getNgayBan() + "'" +
            ", tongTienHD='" + getTongTienHD() + "'" +
            "}";
    }
}

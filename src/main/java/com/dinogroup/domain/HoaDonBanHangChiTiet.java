package com.dinogroup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A HoaDonBanHangChiTiet.
 */
@Entity
@Table(name = "hoa_don_ban_hang_chi_tiet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HoaDonBanHangChiTiet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "so_met")
    private String soMet;

    @Column(name = "don_gia")
    private String donGia;

    @Column(name = "tong_tien")
    private String tongTien;

    @OneToMany(mappedBy = "hdbhchitiet")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HoaDonBanHang> hoadonbanhangs = new HashSet<>();

    @ManyToOne
    private SanPham sanPham;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSoMet() {
        return soMet;
    }

    public HoaDonBanHangChiTiet soMet(String soMet) {
        this.soMet = soMet;
        return this;
    }

    public void setSoMet(String soMet) {
        this.soMet = soMet;
    }

    public String getDonGia() {
        return donGia;
    }

    public HoaDonBanHangChiTiet donGia(String donGia) {
        this.donGia = donGia;
        return this;
    }

    public void setDonGia(String donGia) {
        this.donGia = donGia;
    }

    public String getTongTien() {
        return tongTien;
    }

    public HoaDonBanHangChiTiet tongTien(String tongTien) {
        this.tongTien = tongTien;
        return this;
    }

    public void setTongTien(String tongTien) {
        this.tongTien = tongTien;
    }

    public Set<HoaDonBanHang> getHoadonbanhangs() {
        return hoadonbanhangs;
    }

    public HoaDonBanHangChiTiet hoadonbanhangs(Set<HoaDonBanHang> hoaDonBanHangs) {
        this.hoadonbanhangs = hoaDonBanHangs;
        return this;
    }

    public HoaDonBanHangChiTiet addHoadonbanhang(HoaDonBanHang hoaDonBanHang) {
        this.hoadonbanhangs.add(hoaDonBanHang);
        hoaDonBanHang.setHdbhchitiet(this);
        return this;
    }

    public HoaDonBanHangChiTiet removeHoadonbanhang(HoaDonBanHang hoaDonBanHang) {
        this.hoadonbanhangs.remove(hoaDonBanHang);
        hoaDonBanHang.setHdbhchitiet(null);
        return this;
    }

    public void setHoadonbanhangs(Set<HoaDonBanHang> hoaDonBanHangs) {
        this.hoadonbanhangs = hoaDonBanHangs;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public HoaDonBanHangChiTiet sanPham(SanPham sanPham) {
        this.sanPham = sanPham;
        return this;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
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
        HoaDonBanHangChiTiet hoaDonBanHangChiTiet = (HoaDonBanHangChiTiet) o;
        if (hoaDonBanHangChiTiet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hoaDonBanHangChiTiet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HoaDonBanHangChiTiet{" +
            "id=" + getId() +
            ", soMet='" + getSoMet() + "'" +
            ", donGia='" + getDonGia() + "'" +
            ", tongTien='" + getTongTien() + "'" +
            "}";
    }
}

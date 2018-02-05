package com.dinogroup.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
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

    @NotNull
    @Column(name = "ngay_ban", nullable = false)
    private LocalDate ngayBan;

    @Column(name = "ten_khach_hang")
    private String tenKhachHang;

    @NotNull
    @Column(name = "so_met", nullable = false)
    private Float soMet;

    @NotNull
    @Column(name = "don_gia", nullable = false)
    private Float donGia;

    @Column(name = "tong_tien")
    private Float tongTien;

    @ManyToOne
    private SanPham sanPham;

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

    public HoaDonBanHangChiTiet ngayBan(LocalDate ngayBan) {
        this.ngayBan = ngayBan;
        return this;
    }

    public void setNgayBan(LocalDate ngayBan) {
        this.ngayBan = ngayBan;
    }

    public String getTenKhachHang() {
        return tenKhachHang;
    }

    public HoaDonBanHangChiTiet tenKhachHang(String tenKhachHang) {
        this.tenKhachHang = tenKhachHang;
        return this;
    }

    public void setTenKhachHang(String tenKhachHang) {
        this.tenKhachHang = tenKhachHang;
    }

    public Float getSoMet() {
        return soMet;
    }

    public HoaDonBanHangChiTiet soMet(Float soMet) {
        this.soMet = soMet;
        return this;
    }

    public void setSoMet(Float soMet) {
        this.soMet = soMet;
    }

    public Float getDonGia() {
        return donGia;
    }

    public HoaDonBanHangChiTiet donGia(Float donGia) {
        this.donGia = donGia;
        return this;
    }

    public void setDonGia(Float donGia) {
        this.donGia = donGia;
    }

    public Float getTongTien() {
        return tongTien;
    }

    public HoaDonBanHangChiTiet tongTien(Float tongTien) {
        this.tongTien = tongTien;
        return this;
    }

    public void setTongTien(Float tongTien) {
        this.tongTien = tongTien;
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
            ", ngayBan='" + getNgayBan() + "'" +
            ", tenKhachHang='" + getTenKhachHang() + "'" +
            ", soMet=" + getSoMet() +
            ", donGia=" + getDonGia() +
            ", tongTien=" + getTongTien() +
            "}";
    }
}

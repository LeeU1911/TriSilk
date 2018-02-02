package com.dinogroup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SanPham.
 */
@Entity
@Table(name = "san_pham")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SanPham implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ngay_tao")
    private LocalDate ngayTao;

    @Column(name = "kho_rong")
    private String khoRong;

    @Column(name = "met")
    private String met;

    @Column(name = "trong_luong")
    private String trongLuong;

    @Column(name = "ten_san_pham")
    private String tenSanPham;

    @Column(name = "don_gia")
    private String donGia;

    @Column(name = "tong_tien")
    private String tongTien;

    @Column(name = "met_con_lai")
    private String metConLai;

    @OneToMany(mappedBy = "sanPham")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HoaDonBanHangChiTiet> hdbhchitiets = new HashSet<>();

    @ManyToOne
    private MaSanPham maSanPham;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNgayTao() {
        return ngayTao;
    }

    public SanPham ngayTao(LocalDate ngayTao) {
        this.ngayTao = ngayTao;
        return this;
    }

    public void setNgayTao(LocalDate ngayTao) {
        this.ngayTao = ngayTao;
    }

    public String getKhoRong() {
        return khoRong;
    }

    public SanPham khoRong(String khoRong) {
        this.khoRong = khoRong;
        return this;
    }

    public void setKhoRong(String khoRong) {
        this.khoRong = khoRong;
    }

    public String getMet() {
        return met;
    }

    public SanPham met(String met) {
        this.met = met;
        return this;
    }

    public void setMet(String met) {
        this.met = met;
    }

    public String getTrongLuong() {
        return trongLuong;
    }

    public SanPham trongLuong(String trongLuong) {
        this.trongLuong = trongLuong;
        return this;
    }

    public void setTrongLuong(String trongLuong) {
        this.trongLuong = trongLuong;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public SanPham tenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
        return this;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getDonGia() {
        return donGia;
    }

    public SanPham donGia(String donGia) {
        this.donGia = donGia;
        return this;
    }

    public void setDonGia(String donGia) {
        this.donGia = donGia;
    }

    public String getTongTien() {
        return tongTien;
    }

    public SanPham tongTien(String tongTien) {
        this.tongTien = tongTien;
        return this;
    }

    public void setTongTien(String tongTien) {
        this.tongTien = tongTien;
    }

    public String getMetConLai() {
        return metConLai;
    }

    public SanPham metConLai(String metConLai) {
        this.metConLai = metConLai;
        return this;
    }

    public void setMetConLai(String metConLai) {
        this.metConLai = metConLai;
    }

    public Set<HoaDonBanHangChiTiet> getHdbhchitiets() {
        return hdbhchitiets;
    }

    public SanPham hdbhchitiets(Set<HoaDonBanHangChiTiet> hoaDonBanHangChiTiets) {
        this.hdbhchitiets = hoaDonBanHangChiTiets;
        return this;
    }

    public SanPham addHdbhchitiet(HoaDonBanHangChiTiet hoaDonBanHangChiTiet) {
        this.hdbhchitiets.add(hoaDonBanHangChiTiet);
        hoaDonBanHangChiTiet.setSanPham(this);
        return this;
    }

    public SanPham removeHdbhchitiet(HoaDonBanHangChiTiet hoaDonBanHangChiTiet) {
        this.hdbhchitiets.remove(hoaDonBanHangChiTiet);
        hoaDonBanHangChiTiet.setSanPham(null);
        return this;
    }

    public void setHdbhchitiets(Set<HoaDonBanHangChiTiet> hoaDonBanHangChiTiets) {
        this.hdbhchitiets = hoaDonBanHangChiTiets;
    }

    public MaSanPham getMaSanPham() {
        return maSanPham;
    }

    public SanPham maSanPham(MaSanPham maSanPham) {
        this.maSanPham = maSanPham;
        return this;
    }

    public void setMaSanPham(MaSanPham maSanPham) {
        this.maSanPham = maSanPham;
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
        SanPham sanPham = (SanPham) o;
        if (sanPham.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sanPham.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SanPham{" +
            "id=" + getId() +
            ", ngayTao='" + getNgayTao() + "'" +
            ", khoRong='" + getKhoRong() + "'" +
            ", met='" + getMet() + "'" +
            ", trongLuong='" + getTrongLuong() + "'" +
            ", tenSanPham='" + getTenSanPham() + "'" +
            ", donGia='" + getDonGia() + "'" +
            ", tongTien='" + getTongTien() + "'" +
            ", metConLai='" + getMetConLai() + "'" +
            "}";
    }
}

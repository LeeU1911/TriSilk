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
 * A MaSanPham.
 */
@Entity
@Table(name = "ma_san_pham")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MaSanPham implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @OneToMany(mappedBy = "maSanPham")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SanPham> sanPhams = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public MaSanPham productId(String productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public MaSanPham createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Set<SanPham> getSanPhams() {
        return sanPhams;
    }

    public MaSanPham sanPhams(Set<SanPham> sanPhams) {
        this.sanPhams = sanPhams;
        return this;
    }

    public MaSanPham addSanPham(SanPham sanPham) {
        this.sanPhams.add(sanPham);
        sanPham.setMaSanPham(this);
        return this;
    }

    public MaSanPham removeSanPham(SanPham sanPham) {
        this.sanPhams.remove(sanPham);
        sanPham.setMaSanPham(null);
        return this;
    }

    public void setSanPhams(Set<SanPham> sanPhams) {
        this.sanPhams = sanPhams;
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
        MaSanPham maSanPham = (MaSanPham) o;
        if (maSanPham.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), maSanPham.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MaSanPham{" +
            "id=" + getId() +
            ", productId='" + getProductId() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}

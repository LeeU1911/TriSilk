package com.dinogroup.repository;

import com.dinogroup.domain.HoaDonBanHangChiTiet;
import com.dinogroup.domain.SanPham;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HoaDonBanHangChiTiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoaDonBanHangChiTietRepository extends JpaRepository<HoaDonBanHangChiTiet, Long> {

    @Query("select sum(soMet) from HoaDonBanHangChiTiet where sanPham =?1")
    Float tongSoMet( SanPham sanPham);
}

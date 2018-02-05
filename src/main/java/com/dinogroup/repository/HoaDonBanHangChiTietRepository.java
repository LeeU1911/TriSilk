package com.dinogroup.repository;

import com.dinogroup.domain.HoaDonBanHangChiTiet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HoaDonBanHangChiTiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoaDonBanHangChiTietRepository extends JpaRepository<HoaDonBanHangChiTiet, Long> {

}

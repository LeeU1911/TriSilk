package com.dinogroup.repository;

import com.dinogroup.domain.HoaDonBanHang;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HoaDonBanHang entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoaDonBanHangRepository extends JpaRepository<HoaDonBanHang, Long> {

}

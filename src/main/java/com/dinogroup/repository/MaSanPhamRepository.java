package com.dinogroup.repository;

import com.dinogroup.domain.MaSanPham;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MaSanPham entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaSanPhamRepository extends JpaRepository<MaSanPham, Long> {

}

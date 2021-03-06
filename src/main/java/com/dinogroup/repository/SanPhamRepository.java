package com.dinogroup.repository;

import com.dinogroup.domain.SanPham;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the SanPham entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    List<SanPham> findAllByOrderByMetConLaiAsc();

    List<SanPham> findByMetConLaiLessThanOrderByMetConLaiAsc(Float metConLai);

}

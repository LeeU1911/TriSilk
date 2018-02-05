package com.dinogroup.service;

import com.dinogroup.domain.HoaDonBanHangChiTiet;
import com.dinogroup.domain.SanPham;
import com.dinogroup.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public void updateRemainingMetre(HoaDonBanHangChiTiet hoaDonBanHangChiTiet){
        SanPham sanPham = sanPhamRepository.findOne(hoaDonBanHangChiTiet.getSanPham().getId());
        if (sanPham == null) {
            return;
        }
        sanPham.setMetConLai(sanPham.getMetConLai() - hoaDonBanHangChiTiet.getSoMet());
        sanPhamRepository.save(sanPham);
    }
}

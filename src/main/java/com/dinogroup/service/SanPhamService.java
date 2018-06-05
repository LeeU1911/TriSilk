package com.dinogroup.service;

import com.dinogroup.domain.HoaDonBanHangChiTiet;
import com.dinogroup.domain.SanPham;
import com.dinogroup.repository.HoaDonBanHangChiTietRepository;
import com.dinogroup.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private HoaDonBanHangChiTietRepository hoaDonBanHangChiTietRepository;

    public void updateRemainingMetre(long sanPhamId) {
        SanPham sanPham = sanPhamRepository.findOne(sanPhamId);
        if (sanPham == null) {
            return;
        }
        Float tongSoMet = hoaDonBanHangChiTietRepository.tongSoMet(sanPham);
        tongSoMet = tongSoMet == null ? 0 : tongSoMet;
        sanPham.setMetConLai(
            sanPham.getSoMet() - tongSoMet);
        sanPhamRepository.save(sanPham);
    }
}

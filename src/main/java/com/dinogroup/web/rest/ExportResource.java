package com.dinogroup.web.rest;

import com.dinogroup.domain.SanPham;
import com.dinogroup.repository.SanPhamRepository;
import com.dinogroup.view.ExcelReportView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequestMapping("export")
@RestController
public class ExportResource {

    @Autowired
    SanPhamRepository sanPhamRepository;

    @GetMapping("sanphams")
    public ModelAndView getExcel(){

        List<SanPham> sanPhams = sanPhamRepository.findAllByOrderByMetConLaiAsc();
        ExcelReportView excelReportView = new ExcelReportView();
        excelReportView.sanPhams=sanPhams;
        return new ModelAndView(excelReportView, "sanPhams", sanPhams);
    }
}

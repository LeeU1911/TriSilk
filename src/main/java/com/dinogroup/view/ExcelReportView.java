package com.dinogroup.view;

import com.dinogroup.domain.SanPham;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public class ExcelReportView extends AbstractXlsView {

    public List<SanPham> sanPhams;

    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        response.setHeader("Content-Disposition", "attachment;filename=\"sanpham.xls\"");
        Sheet sheet = workbook.createSheet("sanpham Data");
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID");
        header.createCell(1).setCellValue("Ngày Tạo");
        header.createCell(2).setCellValue("Khổ rộng");
        header.createCell(3).setCellValue("Số mét");
        header.createCell(4).setCellValue("Trọng lượng");
        header.createCell(5).setCellValue("Tên sản phẩm");
        header.createCell(6).setCellValue("Đơn giá");
        header.createCell(7).setCellValue("Tổng tiền");
        header.createCell(8).setCellValue("Số mét còn lại");
        header.createCell(9).setCellValue("Mã sản phẩm");

        int rowNum = 1;
        for (SanPham sanPham : sanPhams) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(sanPham.getId());
            row.createCell(1).setCellValue(sanPham.getNgayTao().toString());
            row.createCell(2).setCellValue(sanPham.getKhoRong());
            row.createCell(3).setCellValue(sanPham.getSoMet());
            row.createCell(4).setCellValue(sanPham.getTrongLuong());
            row.createCell(5).setCellValue(sanPham.getTenSanPham());
            row.createCell(6).setCellValue(sanPham.getDonGia());
            row.createCell(7).setCellValue(sanPham.getTongTien());
            row.createCell(8).setCellValue(sanPham.getMetConLai());
            row.createCell(9).setCellValue(sanPham.getMaSanPham().getProductId());
        }
    }
}

package com.dinogroup.domain;

import java.util.List;

public class MailUtil {
    static final String MAIL_TEMPLATE = "Danh sách các sản phẩm có số mét còn lại nhỏ hơn 250 \n" +
        "<html>\n" +
        "<table width=\"600\" style=\"border:1px solid #333\">\n" +
        "  <tr>\n" +
        "    <td align=\"center\">head</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td align=\"center\">\n" +
        "      body \n" +
        "      <table align=\"center\" width=\"300\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border:1px solid #ccc;\">\n" +
        "        <tr>\n" +
        "          <td> id </td>\n" +
        "          <td>Tên Sản Phẩm </td>\n" +
        "          <td>Số mét còn lại</td>\n" +
        "        </tr>\n" +
        "%s" +
        "      </table>\n" +
        "    </td>\n" +
        "  </tr>\n" +
        "</table>\n" +
        "</html>";

    static final String PHONE_TEMPLATE = "Danh sach cac san pham co so met con lai nho hon 250: %s";

    static final String TR_TEMPLATE = "<tr>" +
        "<td>%s</td> <td>%s</td> <td>%s</td>" +
        "</tr>";

    static public String getMailContain(List<SanPham> sanPhams) {
        if(sanPhams.size()<1){
            return  "không có sản phẩm nào số mét còn lại nhỏ hơn 250";
        }
        String rows = "";
        for (SanPham sanPham : sanPhams) {
            rows += String.format(TR_TEMPLATE, sanPham.getId(), sanPham.getTenSanPham(), sanPham.getMetConLai());
        }
        return String.format(MAIL_TEMPLATE, rows);
    }

    static public String getPhoneContent(List<SanPham> sanPhams) {
        if(sanPhams.size()<1){
            return  "Khong co san pham nao so met con lai nho hon 250";
        }
        String sanPhamIds = "";
        for (SanPham sanPham : sanPhams) {
            sanPhamIds += sanPham.getId() + ", ";
        }
        return String.format(PHONE_TEMPLATE, sanPhamIds);
    }
}

package com.dinogroup.schedule;

import com.dinogroup.domain.MailEnt;
import com.dinogroup.domain.MailUtil;
import com.dinogroup.domain.SanPham;
import com.dinogroup.domain.User;
import com.dinogroup.repository.SanPhamRepository;
import com.dinogroup.repository.UserRepository;
import com.dinogroup.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class DailyNotification {

    final Logger logger = LoggerFactory.getLogger(DailyNotification.class);

    @Value("${noti.hook}")
    String hook;

    @Value("${noti.alert-bound}")
    Float alertBound;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SanPhamRepository sanPhamRepository;

    @Scheduled(cron = "* * 7 * * *")
    public void scheduleTaskUsingCronExpression() {
        System.out.println(hook);
        System.out.println("aaaaaaaaaaaa"+alertBound);
        List<User> users = userRepository.findAllByIsNoti(true);
        List<SanPham> sanPhams = sanPhamRepository.findByMetConLaiLessThanOrderByMetConLaiAsc(alertBound);
        for (User user : users) {
            MailEnt mailEnt = new MailEnt();
            mailEnt.phone = user.getPhone();
            mailEnt.mail = user.getEmail();
            mailEnt.mailSubject = "Báo cáo hàng ngày";
            mailEnt.mailContent = MailUtil.getMailContain(sanPhams);
            mailEnt.phoneContent = MailUtil.getPhoneContent(sanPhams);
            logger.info(mailEnt.toString());
            RestTemplate restTemplate = new RestTemplate();
            restTemplate
                .postForEntity(hook,
                    mailEnt, String.class);

        }


    }
}

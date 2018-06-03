package com.dinogroup.domain;

public class MailEnt {


    public String phone;
    public String phoneContent;
    public String mail;
    public String mailSubject;
    public String mailContent;


    @Override
    public String toString() {
        return "MailEnt{" +
            "phone='" + phone + '\'' +
            ", phoneContent='" + phoneContent + '\'' +
            ", mail='" + mail + '\'' +
            ", mailSubject='" + mailSubject + '\'' +
            ", mailContent='" + mailContent + '\'' +
            '}';
    }
}

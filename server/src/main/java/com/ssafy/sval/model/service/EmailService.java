package com.ssafy.sval.model.service;


import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;


public class EmailService {

    @Autowired
    public JavaMailSender emailSender;

    public void sendMail(String to, String sub, String dice){

        final String user = "studyA301@gmail.com";
        final String pass = "tmxjelqkfrus1!";

        try {
            Email email = new SimpleEmail();
            email.setHostName("smtp.gmail.com");
            email.setSmtpPort(587);
            email.setAuthenticator(new DefaultAuthenticator(user, pass));
            email.setStartTLSRequired(true);
            email.setFrom(user);
            email.setDebug(true);
            email.setSubject(sub);
            email.setMsg(dice);
            email.addTo(to);
            email.send();
        } catch (Exception e){
            e.printStackTrace();
        }
    }

}

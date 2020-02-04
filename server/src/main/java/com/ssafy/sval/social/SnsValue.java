package com.ssafy.sval.social;

import com.github.scribejava.apis.GoogleApi20;
import com.github.scribejava.core.builder.api.DefaultApi20;

public class SnsValue implements SnsUrls {

    private String service;
    private String clientId;
    private String clientSecret;
    private String redirectUrl;
    private DefaultApi20 api20;
    private String profileUrl;


    public SnsValue(String service, String clientId, String clientSecret, String redirectUrl) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUrl = redirectUrl;

        if(service.equals("naver")) {
            this.api20 = NaverAPI20.instence();
            this.setProfileUrl(NAVER_PORFILE_URL);
        }
    }

    public DefaultApi20 getApi20() {
        return api20;
    }

    public void setApi20(DefaultApi20 api20) {
        this.api20 = api20;
    }


    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }




}

package com.ssafy.sval.social;

import org.springframework.stereotype.Component;

import com.github.scribejava.core.builder.api.DefaultApi20;


public class NaverAPI20 extends DefaultApi20 implements SnsUrls {

    private NaverAPI20() {}
    private static class InstenceHolder{
        private static final NaverAPI20 instence = new NaverAPI20();
    }
    public static NaverAPI20 instence() {
        return InstenceHolder.instence;
    }

    @Override
    public String getAccessTokenEndpoint() {
        return NAVER_ACCESS_TOKEN;
    }

    @Override
    protected String getAuthorizationBaseUrl() {
        return NAVER_AUTH;
    }

}

package com.ssafy.sval.social;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.ssafy.sval.model.entity.User;

public class SnsLogin {

    private OAuth20Service oauthService;
    private String profileUrl;

    public SnsLogin() {
    }

    public SnsLogin(SnsValue sns) {
        this.oauthService = new ServiceBuilder(sns.getClientId())
                .apiSecret(sns.getClientSecret())
                .callback(sns.getRedirectUrl())
                .scope("profile")
                .build(sns.getApi20());
        this.profileUrl = sns.getProfileUrl();
    }

    public String getSnsAuthURL() {
        return this.oauthService.getAuthorizationUrl();
    }

    public User getNaverProfile(String code) throws Exception {

        OAuth2AccessToken oat = oauthService.getAccessToken(code);
        OAuthRequest request = new OAuthRequest(Verb.GET, this.profileUrl);
        oauthService.signRequest(oat, request);
        Response response = oauthService.execute(request);
        String result = response.getBody();
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = (JsonObject) parser.parse(result);
        JsonObject userinfo = (JsonObject) jsonObject.get("response");
        String tempid = null;
        if(userinfo.get("id") != null ){
            tempid = userinfo.get("id").toString().substring(1, userinfo.get("id").toString().length() - 1);
        }
        String social_login = "naver@".concat(tempid);
        int gender = 2;
        if(userinfo.get("gender") != null){
            gender = userinfo.get("gender").toString().charAt(1) == 'M' ? 0 : 1;
        }
        String email = null;
        if(userinfo.get("email") != null) {
            userinfo.get("email").toString().substring(1, userinfo.get("email").toString().length() - 1);
        }
        String name = null;
        if(userinfo.get("name") != null){
            name = userinfo.get("name").toString().substring(1, userinfo.get("name").toString().length() - 1);
            try {
                name = new String(name.getBytes("UTF-8"), "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        //User user = new User(0, null, email, null, name, gender, null, null, null, null, null, social_login,null);
        User user = new User();
        user.setNickname(name);
        user.setSocialLogin(social_login);
        user.setEmail(email);
        return user;

    }

    public User getKakaoProfile(SnsValue sns, String code) throws Exception {

        String requestUrl = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(requestUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        StringBuilder sb = new StringBuilder();
        sb.append("grant_type=authorization_code");
        sb.append("&client_id=" + sns.getClientId());
        sb.append("&redirect_uri=" + sns.getRedirectUrl());
        sb.append("&code=" + code);
        bw.write(sb.toString());
        bw.flush();
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String result = br.readLine();
        String[] parser1 = result.split(":");
        br.close();
        bw.close();
        String[] parser2 = parser1[1].split(",");
        String token = "";
        for (int i = 1; i < parser2[0].length() - 1; i++) {
            token += parser2[0].charAt(i);
        }
        User user = getUserInfo(token);
        return user;
    }

    public User getUserInfo(String token) throws Exception {
        String requestUrl = "https://kapi.kakao.com/v2/user/me";
        URL url = new URL(requestUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + token);
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String readUser = br.readLine();
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = (JsonObject) parser.parse(readUser);

        String id = null;
        if(jsonObject.get("id") != null){
            id = "kakao@".concat(jsonObject.get("id").toString());
        }
        JsonObject userinfo = (JsonObject) jsonObject.get("kakao_account");

        String email = null;
        if(userinfo.get("email") != null){
            email = userinfo.get("email").toString().substring(1, userinfo.get("email").toString().length() - 1);
        }
        else email = id;
        JsonObject nickname = null;
        String name = null;
        if(userinfo.get("profile")!=null) {
            nickname = (JsonObject) (userinfo.get("profile"));
            if(nickname.get("nickname") != null){
                name = id + nickname.get("nickname").toString().substring(1, nickname.get("nickname").toString().length() - 1);
            }
            else nickname = id + "?";
        }
        // id, null, email,null, name, 0, null, null, 100.0, null
        // User user = new User(0, null, email, null, name, 0, null, null, null, null, null, id, null,null);
        // User user = new User(0, null, email, null, name, 0, null, null, null, null, null, id, null);
        User user = new User();
        user.setEmail(email);
        user.setNickname(name);
        user.setSocialLogin(id);
        return user;
    }

}

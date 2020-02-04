package com.ssafy.sval.model.entity;

import java.io.Serializable;

public class UserInterestId implements Serializable {

    private long user;
    private String l_category;
    private String s_category;

    public UserInterestId() {
    }

    public UserInterestId(int user, String l_category, String s_category) {
        this.user = user;
        this.l_category = l_category;
        this.s_category = s_category;
    }
}

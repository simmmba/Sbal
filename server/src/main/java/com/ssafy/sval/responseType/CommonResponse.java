package com.ssafy.sval.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse {
    // 어떤 메소드에서 오류가 났는지 확인
    private String cause;
    // SUCCESS, FAIL, ERROR
    private String state;
    // client로 전달할 메시지
    private String message;
}
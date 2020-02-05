package com.ssafy.sval.responseType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse {
    // client로 전달할 객체
    private Object value;
    // 어떤 메소드를 호출했는지 확인(디버그용)
    private String cause;
    // SUCCESS, FAIL, ERROR
    private String state;
    // client로 전달할 메시지
    private String message;

    // 전달할 데이터는 없고 통신 확인용 Response를 만들 때 사용
    public CommonResponse(String cause, String state, String message) {
        this.cause = cause;
        this.state = state;
        this.message = message;
    }
}
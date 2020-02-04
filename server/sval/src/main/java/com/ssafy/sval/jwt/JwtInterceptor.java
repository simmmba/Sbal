package com.ssafy.sval.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("OPTIONS")) {
            return true;
        } else {
            String token = request.getHeader("jwt-auth-token");
            if(token != null && token.length() > 0) {
                jwtService.checkValid(token);
                log.trace("토큰 상태 정상 : {}", token);
                return true;
            } else {
                throw new RuntimeException("인증 토큰이 유효하지 않습니다.");
            }
        }
    }
}

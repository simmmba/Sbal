package com.ssafy.sval.util.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
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
                try {
                    jwtService.checkValid(token);
                    return true;
                } catch (ExpiredJwtException e) {
                    throw e;
                } catch (JwtException e) {
                    throw e;
                }
            } else {
                throw new RuntimeException("JWT_NOT_EXIST");
            }
        }
    }
}

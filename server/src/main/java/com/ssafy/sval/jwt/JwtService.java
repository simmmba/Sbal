package com.ssafy.sval.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class JwtService {
    @Value("${jwt.salt}")
    private String salt;
    @Value("${jwt.expmin}")
    private Long expireMin;

    public String create(final Integer userId) {
        final JwtBuilder builder = Jwts.builder();
        builder.setHeaderParam("typ", "JWT");
        builder.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin))
                .claim("loginUser", userId).signWith(SignatureAlgorithm.HS256, salt.getBytes());
        final String jwt = builder.compact();
        return jwt;
    }

    public void checkValid(final String jwt) {
        try {
            Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
        } catch (ExpiredJwtException e) {
            throw e;
        } catch (JwtException e) {
            throw e;
        }
    }

    public int getLoginUserId(final HttpServletRequest request) {
        int loginUserId = 0;
        try {
            final String jwt = request.getHeader("jwt-auth-token");
            System.out.println(jwt);
            if(jwt==null || jwt.length() <= 0) return -1;
            Map jwtPayload = Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt).getBody();
            loginUserId = (int) jwtPayload.get("loginUser");
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("JWT_getLoginUserId");
        }
        return loginUserId;
    }
}
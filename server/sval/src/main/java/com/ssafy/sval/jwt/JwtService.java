package com.ssafy.sval.jwt;

import com.ssafy.sval.model.entity.User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class JwtService {
    @Value("${jwt.salt}")
    private String salt;
    @Value("${jwt.expmin}")
    private Long expireMin;

    public String create(final User user) {
        log.trace("time : {}", expireMin);
        final JwtBuilder builder = Jwts.builder();
        builder.setHeaderParam("typ", "JWT");
        builder.setSubject("loginToken")
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin))
                .claim("User", user).signWith(SignatureAlgorithm.HS256, salt.getBytes());
        final String jwt = builder.compact();
        return jwt;
    }

    public void checkValid(final String jwt) {
        log.trace("Validate Token : {}", jwt);
        Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
    }

    public Map<String, Object> get(final String jwt) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
        } catch(final Exception e) {
            throw new RuntimeException();
        }
        log.trace("claims : {}", claims);
        return claims.getBody();
    }
}

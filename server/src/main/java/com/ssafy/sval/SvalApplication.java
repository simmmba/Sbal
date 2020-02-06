package com.ssafy.sval;

import com.ssafy.sval.config.UserProfileUploadProperties;
import com.ssafy.sval.jwt.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;


@SpringBootApplication
@EnableConfigurationProperties({UserProfileUploadProperties.class})
public class SvalApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(SvalApplication.class, args);
    }

    @Autowired
    JwtInterceptor jwtInterceptor;

    // /user/auth/{email}
    //addPathPatterns("/user/auth/**))
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor).addPathPatterns("/study"); //"/user/auth/**",
//                .excludePathPatterns(Arrays.asList("/user", "/user/signIn"));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("jwt-auth-token");
    }
}

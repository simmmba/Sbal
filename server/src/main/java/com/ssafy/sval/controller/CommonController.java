package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.UserDTO;
import com.ssafy.sval.model.service.CommonService;
import com.ssafy.sval.model.service.UserService;
import com.ssafy.sval.responseType.CommonResponse;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@CrossOrigin({"*"})
@Slf4j
public class CommonController {
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;
    @Autowired
    CommonService commonService;

    @ExceptionHandler
    @ApiOperation(value = "모든 INTERNAL SERVER ERROR 상태를 처리한다. message를 화면에 출력하고 작성한 ERROR PAGE로 이동시킨다.")
    public ResponseEntity<CommonResponse> errorHandler(RuntimeException e) {
        // Slack 으로 개발자에게 로그 보내는 기능 추가
        // e.printStackTrace();
        return new ResponseEntity<>(new CommonResponse(e.getMessage(), "ERROR",
                "현재 서버 상태가 불안정하여 정상적인 서비스 이용이 불가합니다. 잠시 후 다시 시도해주세요."), HttpStatus.OK);
    }

    @GetMapping(value = "/")
    public ResponseEntity<CommonResponse> manufactureMain(HttpServletRequest request) {
        Map<String, Object> mainInfo;
        log.info("request for main");
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            if (loginUserId > 0) {
                UserDTO loginUser = userService.findById(loginUserId).mainPageDTO();
                mainInfo = commonService.manufactureMain(loginUser);
            } else {
                mainInfo = commonService.manufactureMain();
            }
            return new ResponseEntity<>(new CommonResponse(mainInfo, "manufactureMain", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("manufactureMain");
        }
    }
}

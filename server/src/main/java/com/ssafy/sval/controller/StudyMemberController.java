package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.service.StudyMemberService;
import com.ssafy.sval.responseType.CommonResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/study/member")
@CrossOrigin({"*"})
@Slf4j
public class StudyMemberController {
    @Autowired
    JwtService jwtService;
    @Autowired
    StudyMemberService studyMemberService;

    @ExceptionHandler
    @ApiOperation(value = "모든 INTERNAL SERVER ERROR 상태를 처리한다. message를 화면에 출력하고 작성한 ERROR PAGE로 이동시킨다.")
    public ResponseEntity<CommonResponse> errorHandler(Exception e) {
        // Slack 으로 개발자에게 로그 보내는 기능 추가
        // e.printStackTrace();
        return new ResponseEntity<>(new CommonResponse(e.getMessage(), "ERROR",
                "현재 서버 상태가 불안정하여 정상적인 서비스 이용이 불가합니다. 잠시 후 다시 시도해주세요."), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<CommonResponse> errorHandler(ExpiredJwtException e) {
        return new ResponseEntity<>(new CommonResponse("JWT_EXPIRED", "ERROR",
                "로그인 세션이 만료되었습니다. 다시 로그인 해주세요"), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<CommonResponse> errorHandler(JwtException e) {
        return new ResponseEntity<>(new CommonResponse("JWT_FALSIFIED", "ERROR",
                "변조된 인증 정보입니다. 다시 로그인 해주세요"), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "개설된 스터디에 참가 요청 한다.", response = CommonResponse.class)
    public ResponseEntity<Object> insertMember(@RequestBody Integer studyId, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            if (studyMemberService.insert(studyId, loginUserId))
                return new ResponseEntity<>(new CommonResponse("insertMember", "SUCCESS", "신청 성공"), HttpStatus.OK);
            else
                return new ResponseEntity<>(new CommonResponse("insertMember", "FAIL", "이미 신청한 내역이 있습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("insertMember");
        }
    }

    @PutMapping
    @ApiOperation(value = "참가 신청자의 상태를 변경한다.", response = CommonResponse.class)
    public ResponseEntity<Object> updateMemberState(@RequestBody StudyMemberDTO studyMemberDTO, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            if (studyMemberService.update(studyMemberDTO, loginUserId))
                return new ResponseEntity<>(new CommonResponse("updateMemberState", "SUCCESS", "상태 변경 성공"), HttpStatus.OK);
            else
                return new ResponseEntity<>(new CommonResponse("updateMemberState", "FAIL", "가입 요청은 리더만 변경할 수 있습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("updateMemberState");
        }
    }

    @DeleteMapping("/{studyId}")
    @ApiOperation(value = "스터디 참가 신청을 했던 사용자가 요청을 삭제한다.", response = CommonResponse.class)
    public ResponseEntity<Object> deleteMember(@PathVariable Integer studyId, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            studyMemberService.delete(studyId, loginUserId);
            return new ResponseEntity<>(new CommonResponse("deleteMember", "SUCCESS", "신청 철회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("deleteMember");
        }
    }
}
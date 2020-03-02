package com.ssafy.sval.controller;

import com.ssafy.sval.util.jwt.JwtService;
import com.ssafy.sval.model.dto.NoticeDTO;
import com.ssafy.sval.model.entity.Notice;
import com.ssafy.sval.model.service.NoticeService;
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
@RequestMapping("/notice")
@CrossOrigin({"*"})
@Slf4j
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    JwtService jwtService;

    @ExceptionHandler
    public ResponseEntity<CommonResponse> errorHandler(Exception e) {
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
    @ApiOperation(value = "새로운 게시글을 등록한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> insert(@RequestBody NoticeDTO noticeDTO, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            Notice notice = noticeDTO.toEntity(userId);
            notice = noticeService.insert(notice);
            return new ResponseEntity<>(new CommonResponse(notice.toDTO(), "enrollNewNotice", "SUCCESS", "게시글이 등록되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("enrollNewNotice");
        }
    }

    @PutMapping
    @ApiOperation(value = "게시글을 수정한다", response=CommonResponse.class)
    public ResponseEntity<CommonResponse> update(@RequestBody NoticeDTO noticeDTO,  HttpServletRequest request){
        try {
            int userId = jwtService.getLoginUserId(request);
            Notice notice = noticeService.getNoticeDetail(noticeDTO.getId());
            if(notice.getWriter().getId()== userId){
                Notice updateNotice = noticeDTO.toEntity(userId);
                updateNotice = noticeService.update(updateNotice);
                return new ResponseEntity<>(new CommonResponse(updateNotice.toDTO(), "noticeUpdate", "SUCCESS", "게시글이 수정되었습니다."), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new CommonResponse("noticeUpdate", "FAIL", "올바르지 않은 접근입니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("noticeUpdate");
        }
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "게시글의 상세 정보를 가져온다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> selectOne(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            Notice notice = noticeService.getNoticeDetail(id);
            return new ResponseEntity<>(new CommonResponse(notice.toDTO(), "noticeDetails", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("noticeDetails");
        }
    }

    @GetMapping("/increaseHits/{noticeId}")
    @ApiOperation(value = "게시글의 조회수(hits)를 증가시킨다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> increaseHits(@PathVariable Integer noticeId, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            noticeService.increaseHits(noticeId);
            return new ResponseEntity<>(new CommonResponse("increaseHits", "SUCCESS", "조회수 증가"), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("increaseHits");
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "게시글을 삭제한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> delete(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            Notice notice = noticeService.getNotice(id);
            if(notice.getWriter().getId()!=userId) {
                return new ResponseEntity<>(new CommonResponse("noticeDelete", "FAIL", "올바르지 않은 접근입니다."), HttpStatus.OK);
            } else {
                noticeService.delete(id);
                return new ResponseEntity<>(new CommonResponse("noticeDelete", "SUCCESS", "게시글이 삭제되었습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("noticeDelete");
        }
    }
}

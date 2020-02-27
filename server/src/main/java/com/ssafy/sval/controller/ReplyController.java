package com.ssafy.sval.controller;


import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.ReplyDTO;
import com.ssafy.sval.model.entity.Reply;
import com.ssafy.sval.model.service.ReplyService;
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
@RequestMapping("/reply")
@CrossOrigin({"*"})
@Slf4j
public class ReplyController {

    @Autowired
    private ReplyService replyService;

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
    @ApiOperation(value = "새로운 댓글을 등록한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> insert(@RequestBody ReplyDTO replyDTO, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            Reply reply = replyDTO.toEntity(userId);
            reply = replyService.insert(reply);
            return new ResponseEntity<>(new CommonResponse(reply.toDTO(), "enrollNewReply", "SUCCESS", "댓글이 등록되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("enrollNewReply");
        }
    }


    @PutMapping
    @ApiOperation(value = "댓글을 수정한다", response=CommonResponse.class)
    public ResponseEntity<Object> update(@RequestBody ReplyDTO replyDTO, HttpServletRequest request){
        try {
            int userId = jwtService.getLoginUserId(request);
            Reply reply = replyService.getNoticeDetail(replyDTO.getWriter().getId());
            if(reply.getWriter().getId()==userId){
                Reply updateReply = replyDTO.toEntity(userId);
                updateReply = replyService.insert(updateReply);
                return new ResponseEntity<>(new CommonResponse(updateReply.toDTO(), "replyUpdate", "SUCCESS", "댓글이 수정되었습니다."), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(new CommonResponse("replyUpdate", "FAIL", "올바르지 않은 접근입니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("replyUpdate");
        }

    }


    @DeleteMapping("/{id}")
    @ApiOperation(value = "댓글을 삭제한다.", response = CommonResponse.class)
    public ResponseEntity<Object> delete(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int userId = jwtService.getLoginUserId(request);
            Reply reply = replyService.getNoticeDetail(id);
            if(reply.getWriter().getId()!=userId) {
                return new ResponseEntity<>(new CommonResponse("replyDelete", "FAIL", "올바르지 않은 접근입니다."), HttpStatus.OK);
            } else {
                replyService.delete(id);
                return new ResponseEntity<>(new CommonResponse("replyDelete", "SUCCESS", "댓글이 삭제되었습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("replyDelete");
        }
    }


}

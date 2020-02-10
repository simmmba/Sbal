package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.StudyDTO;
import com.ssafy.sval.model.dto.StudyMemberDTO;
import com.ssafy.sval.model.dto.StudyScheduleDTO;
import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.service.StudyMemberService;
import com.ssafy.sval.model.service.StudyService;
import com.ssafy.sval.model.service.UserService;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/study")
@CrossOrigin({"*"})
@Slf4j
public class StudyController {
    @Autowired
    StudyService studyService;
    @Autowired
    StudyMemberService studyMemberService;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;

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

    // 스터디 생성
    @PostMapping
    @ApiOperation(value = "새로운 스터디를 생성한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> enrollNewStudy(@RequestBody StudyDTO study, HttpServletRequest request) {
        try {
            int leaderId = jwtService.getLoginUserId(request);
            Study createdStudy = study.insertOrUpdateEntity(leaderId);
            createdStudy = studyService.insert(createdStudy);
            log.info("createdStudyDTO : {}", createdStudy.toDTO());
            return new ResponseEntity<>(new CommonResponse(createdStudy.toDTO(), "enrollNewStudy", "SUCCESS", "스터디가 등록되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("enrollNewStudy");
        }
    }

    // 스터디 수정
    @PutMapping
    @ApiOperation(value = "스터디를 수정한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> update(@RequestBody StudyDTO study, HttpServletRequest request) {
        try {
            int leaderId = jwtService.getLoginUserId(request);
            Study updatedStudy = study.insertOrUpdateEntity(leaderId);
            updatedStudy = studyService.update(updatedStudy);
            return new ResponseEntity<>(new CommonResponse(updatedStudy.toDTO(), "update", "SUCCESS", "스터디가 수정되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("update");
        }
    }

    // 스터디 삭제
    @DeleteMapping("/{id}")
    @ApiOperation(value = "스터디를 삭제한다.", response = CommonResponse.class)
    public ResponseEntity<Object> delete(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            Study study = studyService.getStudy(id);
            if(study.getLeader().getId()!=loginUserId) {
                return new ResponseEntity<>(new CommonResponse("delete", "FAIL", "올바르지 않은 접근입니다."), HttpStatus.OK);
            } else {
                studyService.delete(id);
                return new ResponseEntity<>(new CommonResponse("delete", "SUCCESS", "스터디가 삭제되었습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("delete");
        }
    }

    // 스터디 상세 조회
    @GetMapping("/{id}")
    @ApiOperation(value = "스터디의 상세 정보를 가져온다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> details(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            StudyDTO studyDTO = studyService.getStudyDetail(id).toDTO();
            studyDTO.setJoinedMemberCount(studyMemberService.getjoinedMemeberCount(studyDTO.getId()));

            List<StudyMemberDTO> smList = studyDTO.getStudyMemberDTOList();
            studyDTO.setStudyMemberDTOList(null);

            List<StudyScheduleDTO> ssList = studyDTO.getStudyScheduleDTOList();
            studyDTO.setStudyScheduleDTOList(null);

            for (StudyMemberDTO sm : smList) {
                if(sm.getUser().getId()==loginUserId && sm.getState()==1) {
                    studyDTO.setStudyScheduleDTOList(ssList);
                    if(loginUserId!=studyDTO.getLeader().getId())
                        for (int i=0; i<smList.size(); i++) if(smList.get(i).getState()!=1) smList.remove(i--);
                    studyDTO.setStudyMemberDTOList(smList);
                    break;
                }
            }

            return new ResponseEntity<>(new CommonResponse(studyDTO, "details", "SUCCESS", "조회 성공"), HttpStatus.OK);

        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("details");
        }
    }

    // 스터디 리스트 전체 조회
    @GetMapping("/list")
    @ApiOperation(value = "모집 중인 스터디 전체 목록을 가져온다. 기본 정렬 : 등록 시간 순", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> getStudiesInRecruitment() {
        try {
            List<Study> studyList = studyService.getStudiesInRecruitment();
            List<StudyDTO> studyDTOList = new ArrayList<>();
            for (Study s : studyList) {
                StudyDTO studyDTO = s.mainPageDTO();
                studyDTO.setJoinedMemberCount(studyMemberService.getjoinedMemeberCount(studyDTO.getId()));
                studyDTOList.add(studyDTO);
            }
            return new ResponseEntity<>(new CommonResponse(studyDTOList, "getStudiesInRecruitment", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("getStudiesInRecruitment");
        }
    }
}
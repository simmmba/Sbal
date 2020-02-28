package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.AttendacneDTO;
import com.ssafy.sval.model.dto.StudyScheduleDTO;
import com.ssafy.sval.model.entity.StudySchedule;
import com.ssafy.sval.model.service.AttendanceService;
import com.ssafy.sval.model.service.StudyScheduleService;
import com.ssafy.sval.model.service.StudyService;
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
@RequestMapping("/study/schedule")
@CrossOrigin({"*"})
@Slf4j
public class StudyScheduleAndAttendanceController {
    @Autowired
    JwtService jwtService;
    @Autowired
    StudyService studyService;
    @Autowired
    AttendanceService attendanceService;
    @Autowired
    StudyScheduleService studyScheduleService;

    @ExceptionHandler
    @ApiOperation(value = "모든 INTERNAL SERVER ERROR 상태를 처리한다. message를 화면에 출력하고 작성한 ERROR PAGE로 이동시킨다.")
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
    @ApiOperation(value = "새로운 스케줄을 추가하고, 추가된 스케줄을 반환한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> enrollNewStudySchedule(@RequestBody StudyScheduleDTO schedule, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            if(studyService.findById(schedule.getStudyDTO().getId()).getLeader().getId()!=loginUserId) {
                return new ResponseEntity<>(new CommonResponse("enrollNewStudySchedule", "FAIL",
                        "스케줄은 리더만 추가할 수 있습니다."), HttpStatus.OK);
            } else {
                StudySchedule newSchedule = studyScheduleService.insert(schedule.toEntity());
                return new ResponseEntity<>(new CommonResponse(newSchedule.toDTO(), "enrollNewStudySchedule", "SUCCESS",
                        "새로운 스케줄을 추가했습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("enrollNewStudySchedule");
        }
    }

    @PutMapping
    @ApiOperation(value ="스케줄의 내용을 변경한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> updateStudySchedule(@RequestBody StudyScheduleDTO schedule, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            if(studyService.findById(schedule.getStudyDTO().getId()).getLeader().getId()!=loginUserId) {
                return new ResponseEntity<>(new CommonResponse("updateStudySchedule", "FAIL",
                        "스케줄은 리더만 수정할 수 있습니다."), HttpStatus.OK);
            } else {
                StudySchedule updatedSchedule = studyScheduleService.update(schedule.toEntity());
                return new ResponseEntity<>(new CommonResponse(updatedSchedule.toDTO(), "updateStudySchedule", "SUCCESS",
                        "스케줄을 수정하였습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("enrollNewStudySchedule");
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "스케줄을 삭제한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> deleteStudySchedule(@PathVariable Integer id, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            StudySchedule schedule = studyScheduleService.find(id);
            if(studyService.findById(schedule.getStudy().getId()).getLeader().getId()!=loginUserId) {
                return new ResponseEntity<>(new CommonResponse("deleteStudySchedule", "FAIL", "스케줄은 리더만 삭제할 수 있습니다."), HttpStatus.OK);
            } else {
                studyScheduleService.delete(id);
                return new ResponseEntity<>(new CommonResponse("deleteStudySchedule", "SUCCESS", "스케줄이 삭제되었습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            throw new RuntimeException("deleteStudySchedule");
        }
    }

    @PutMapping("/attendance")
    @ApiOperation(value = "리더가 출석 상태를 변경한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> updateAttendance(@RequestBody AttendacneDTO attendacneDTO, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            StudySchedule schedule = studyScheduleService.find(attendacneDTO.getSchedule().getId());
            if (schedule.getStudy().getLeader().getId()!=loginUserId) {
                return new ResponseEntity<>(new CommonResponse("updateAttendance", "FAIL", "출석 정보는 리더만 변경할 수 있습니다."), HttpStatus.OK);
            } else {
                attendanceService.update(attendacneDTO.toEntity());
                return new ResponseEntity<>(new CommonResponse("updateAttendance", "SUCCESS", "출석 정보가 변경되었습니다."), HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("updateAttendance");
        }
    }
}
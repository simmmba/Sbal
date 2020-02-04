package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.UserDTO;
import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.StudyMember;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.service.UserProfileService;
import com.ssafy.sval.model.service.UserService;
import com.ssafy.sval.responseType.CommonResponse;
import com.ssafy.sval.social.SnsLogin;
import com.ssafy.sval.social.SnsValue;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin({"*"})
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserProfileService profileService;

    private SnsValue naverSns;
    private SnsValue kakaoSns;


    @ExceptionHandler
    @ApiOperation(value = "모든 INTERNAL SERVER ERROR 상태를 처리한다. message를 화면에 출력하고 작성한 ERROR PAGE로 이동시킨다.")
    public ResponseEntity<Object> errorHandler(RuntimeException e) {
        // Slack 으로 개발자에게 로그 보내는 기능 추가
        // e.printStackTrace();
        return new ResponseEntity<Object>(new CommonResponse(e.getMessage(), "ERROR",
                "현재 서버 상태가 불안정하여 정상적인 서비스 이용이 불가합니다. 잠시 후 다시 시도해주세요."), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<Object> errorHandler(ExpiredJwtException e) {
        return new ResponseEntity<Object>(new CommonResponse("JWT_EXPIRED", "ERROR",
                "로그인 세션이 만료되었습니다. 다시 로그인 해주세요"), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<Object> errorHandler(JwtException e) {
        return new ResponseEntity<Object>(new CommonResponse("JWT_FALSIFIED", "ERROR",
                "변조된 인증 정보입니다. 다시 로그인 해주세요"), HttpStatus.OK);
    }

//    @GetMapping("/list")
//    @ApiOperation(value = "회원 정보 테스트용 api", response = List.class)
//    public List<User> selectAll() {
//        return userService.findAll();
//    }

    @PostMapping
    @ApiOperation(value = "회원가입을 처리하고 성공 시 res.data.state에 SUCCESS, 실패 시 FAIL, 에러 발생 시 ERROR를 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<Object> signUp(@RequestBody UserDTO signUpUser, HttpServletResponse response) {
        // 현재는 CommonResponse를 Return 하고 있지만 메인으로 이동할 계획
        // Main에서 필요한 데이터가 결정되면 데이터를 추가적으로 담아서 보내줄 것.
        try {
            User user = userService.signUp(signUpUser.insertOrUpdateEntity(signUpUser.getPw()));
            if (user != null) {
                response.setHeader("jwt-auth-token", jwtService.create(user.getId()));
                return new ResponseEntity<Object>(new CommonResponse("signUp", "SUCCESS", "회원 가입에 성공했습니다."), HttpStatus.OK);
            } else return new ResponseEntity<Object>(new CommonResponse("signUp", "FAIL", "회원 가입에 실패했습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("signUp");
        }
    }

    @PostMapping("/signIn")
    @ApiOperation(value = "로그인 response header에 JWT토큰 생성 및 전송, 로그인 실패 시 null값 리턴", response = User.class)
    public ResponseEntity<Object> signIn(@RequestBody User user, HttpServletResponse response) {
        try {
            user = userService.signIn(user.getEmail(), user.getPw());
            if (user != null) {
                response.setHeader("jwt-auth-token", jwtService.create(user.getId()));
                return new ResponseEntity<Object>(new CommonResponse("signIn", "SUCCESS", "로그인에 성공했습니다."), HttpStatus.OK);
            } else return new ResponseEntity<Object>(new CommonResponse("signIn", "FAIL", "로그인에 실패했습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("signIn");
        }
    }

    @GetMapping("/auth/getMyInfo")
    @ApiOperation(value = "회원 수정을 위해 필요한 데이터를 반환한다.", response = UserDTO.class)
    public ResponseEntity<Object> getMyInfo(HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            return new ResponseEntity<Object>(userService.findById(loginUserId).updatePageDTO(), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("getMyInfo");
        }
    }

    @PutMapping
    @ApiOperation(value = "회원 정보 수정을 처리하고 성공 시 바뀐 정보를 반영한 JWT와 true를 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<Object> update(@RequestBody UserDTO user, HttpServletRequest request, HttpServletResponse response) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            User updatedUser = userService.update(user.insertOrUpdateEntity(userService.findById(loginUserId).getPw()));
            response.setHeader("jwt-auth-token", jwtService.create(updatedUser.getId()));
            return new ResponseEntity<Object>(new CommonResponse("update", "SUCCESS",
                    "정보 수정이 완료되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("update");
        }
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴 성공시 BoolResult true, 실패시 false 반환", response = CommonResponse.class)
    public ResponseEntity<Object> delete(HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            userService.delete(loginUserId);
            return new ResponseEntity<Object>(new CommonResponse("delete", "SUCCESS", "SUCCESS"), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("delete");
        }
    }

    @GetMapping("/validateEmail/{email}")
    @ApiOperation(value = "이메일 중복확인 사용 가능할 때 res.data.state에 TRUE 문자열을 리턴하고" +
            "이미 가입된 이메일이라면 빈 문자열을 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<Object> validateEmail(@PathVariable String email) {
        if (userService.isExistEmail(email)) {
            return new ResponseEntity<Object>(new CommonResponse("validateEmail", "TRUE", "SUCCESS"), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(new CommonResponse("validateEmail", "", "FAIL"), HttpStatus.OK);
        }
    }

    @GetMapping("/validateNickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인 사용 가능할 때 res.data.state에 TRUE 문자열을 리턴하고" +
            "이미 가입된 닉네임이라면 빈 문자열을 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<Object> validateNickname(@PathVariable String nickname) {
        if (userService.isExistNickname(nickname)) {
            return new ResponseEntity<Object>(new CommonResponse("validateNickname", "TRUE", "SUCCESS"), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(new CommonResponse("validateNickname", "", "FAIL"), HttpStatus.OK);
        }
    }

    @PutMapping("/profileUpload")
    public User profileUpload(@RequestParam("file") MultipartFile file, @RequestParam("userid") int userid) {
        User user = userService.findById(userid);
        if (!user.getProfilePhotoDir().equals("default")) {
            profileService.deleteFile(user.getProfilePhotoDir());
        }
        String fileName = profileService.saveFile(file, user.getId() + "");
        user.setProfilePhotoDir(fileName);
        user = userService.update(user);
        return user;
    }

//    @GetMapping("/find/{id}")
//    public ResponseEntity<Object> find(@PathVariable int id) {
//        User found = userService.findById(id);
//        List<StudyMember> joinedStudy = found.getJoinedStudyList();
//        List<Study> createStudy = found.getLedStudyList();
//
//        for (int i = 0; i < createStudy.size(); i++) {
//            int studyId = createStudy.get(i).getId();
//            for (int j = 0; j < joinedStudy.size(); j++) {
//                StudyMember sm = joinedStudy.get(j);
//                if (sm.getStudy().getId() == studyId) {
//                    joinedStudy.remove(sm);
//                    break;
//                }
//            }
//        }
//
//        UserDTO user = found.mainPageDTO();
//        return new ResponseEntity<Object>(user, HttpStatus.OK);
//    }

    @GetMapping("/loginForm")
    public Map<String, String> loginForm() {

        naverSns = new SnsValue("naver", "ZaZ22Ro1uzKMK_w_pbkX", "QDpGVk3dcT", "http://localhost:8080/user/auth/naver/callback");
        SnsLogin sl = new SnsLogin(naverSns);
        String naverUrl = sl.getSnsAuthURL();
        kakaoSns = new SnsValue("kakao", "65c8c65086b415b91d2decea051f2765", null, "http://localhost:8080/user/auth/kakao/callback");
        String kakaoUrl = "https://kauth.kakao.com/oauth/authorize?" + "client_id=" + kakaoSns.getClientId() + "&redirect_uri=" + kakaoSns.getRedirectUrl() + "&response_type=code";
        Map<String, String> map = new HashMap<>();
        map.put("naverUrl", naverUrl);
        map.put("kakaoUrl", kakaoUrl);

        return map;
    }

    @RequestMapping(value = "/auth/{service}/callback", method = {RequestMethod.GET, RequestMethod.POST})
    public User snsLoginCallBack(@PathVariable String service, @RequestParam String code) throws Exception {
        SnsValue sns = null;
        SnsLogin sl = null;
        User user = null;
        if (service.equals("naver")) {
            sns = naverSns;
            sl = new SnsLogin(sns);
            user = sl.getNaverProfile(code);
        } else if (service.equals("kakao")) {
            sns = kakaoSns;
            sl = new SnsLogin();
            user = sl.getKakaoProfile(sns, code);
        }
        // DB에서 email 확인
        if (userService.isExistEmail(user.getEmail())) {
            //  true : exist
            //로그인 처리
        } else {
            // false : not exist
            //
        }
        return user;
    }
}

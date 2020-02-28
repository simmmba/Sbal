package com.ssafy.sval.controller;

import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.dto.SocialParam;
import com.ssafy.sval.model.dto.UserDTO;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.service.CommonService;
import com.ssafy.sval.model.service.EmailService;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/user")
@CrossOrigin({"*"})
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserProfileService profileService;

    private SnsValue naverSns = new SnsValue("naver", "ZaZ22Ro1uzKMK_w_pbkX", "QDpGVk3dcT", "http://70.12.247.32:8080/user/auth/naver/callback");
    //private SnsValue kakaoSns = new SnsValue("kakao", "65c8c65086b415b91d2decea051f2765", null, "http://localhost:3000/signup/oauth");
    private SnsValue kakaoSns = new SnsValue("kakao", "65c8c65086b415b91d2decea051f2765", null, "http://i02a306.p.ssafy.io/signup/oauth");

    @ExceptionHandler
    @ApiOperation(value = "모든 INTERNAL SERVER ERROR 상태를 처리한다. message를 화면에 출력하고 작성한 ERROR PAGE로 이동시킨다.")
    public ResponseEntity<CommonResponse> errorHandler(RuntimeException e) {
        // Slack 으로 개발자에게 로그 보내는 기능 추가
        e.printStackTrace();
        return new ResponseEntity<>(new CommonResponse(e.getMessage(), "ERROR",
                "현재 서버 상태가 불안정하여 정상적인 서비스 이용이 불가합니다. 잠시 후 다시 시도해주세요."), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<CommonResponse> errorHandler(ExpiredJwtException e) {
        return new ResponseEntity<>(new CommonResponse("JWT_EXPIRED", "ERROR",
                "로그인 세션이 만료되었습니다. 다시 로그인 해주세요."), HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<CommonResponse> errorHandler(JwtException e) {
        return new ResponseEntity<>(new CommonResponse("JWT_FALSIFIED", "ERROR",
                "변조된 인증 정보입니다. 다시 로그인 해주세요."), HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "회원가입을 처리하고 성공 시 res.data.state에 SUCCESS, 실패 시 FAIL, 에러 발생 시 ERROR를 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> signUp(@RequestBody UserDTO signUpUser, HttpServletResponse response) {
        try {
            User user = userService.signUp(signUpUser.insertOrUpdateEntity(signUpUser.getPw()));
            if (user != null) {
                response.setHeader("jwt-auth-token", jwtService.create(user.getId()));
                signUpUser = new UserDTO(user.getId(), user.getNickname());
                return new ResponseEntity<>(new CommonResponse(signUpUser, "signUp", "SUCCESS", "회원 가입에 성공했습니다."), HttpStatus.OK);
            } else return new ResponseEntity<>(new CommonResponse("signUp", "FAIL", "회원 가입에 실패했습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("signUp");
        }
    }

    @PostMapping("/signIn")
    @ApiOperation(value = "로그인 성공 시 main page를 구성할 데이터와 JWT 전송 실패 시 CommonResponse 확인", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> signIn(@RequestBody UserDTO user, HttpServletResponse response) {
        try {
            User loginUser = userService.signIn(user.getEmail(), user.getPw());
            if (loginUser != null) {
                response.setHeader("jwt-auth-token", jwtService.create(loginUser.getId()));
                user = new UserDTO(loginUser.getId(), loginUser.getNickname());
                return new ResponseEntity<>(new CommonResponse(user, "signIn", "SUCCESS", "로그인에 성공했습니다."), HttpStatus.OK);
            } else return new ResponseEntity<>(new CommonResponse("signIn", "FAIL", "로그인 정보를 확인해주세요."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("signIn");
        }
    }


    @GetMapping("/myPage")
    @ApiOperation(value = "마이 페이지에 제공할 정보를 구성하여 전달한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> getMyInfo(HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            UserDTO loginUser = userService.findById(loginUserId).myPageDTO();
            loginUser = commonService.manufactureMyInfo(loginUser);
            return new ResponseEntity<>(new CommonResponse(loginUser, "getMyInfo", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("getMyInfo");
        }
    }

    @GetMapping("/userInfo/{userId}")
    @ApiOperation(value = "마이 페이지에 제공할 정보를 구성하여 전달한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> getMyInfo(@PathVariable String userId, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            UserDTO loginUser = userService.findById(Integer.parseInt(userId)).myPageDTO();
            loginUser = commonService.manufactureMyInfo(loginUser);
            return new ResponseEntity<>(new CommonResponse(loginUser, "getMyInfo", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch(RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("getMyInfo");
        }
    }

    @GetMapping("/modifyProfile")
    @ApiOperation(value = "회원 수정을 위해 필요한 데이터를 반환한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> getMyInfoForModify(HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            UserDTO loginUser = userService.findById(loginUserId).updatePageDTO();
            return new ResponseEntity<>(new CommonResponse(loginUser, "getMyInfoForModify", "SUCCESS", "조회 성공"), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("getMyInfoForModify");
        }
    }

    @PutMapping
    @ApiOperation(value = "회원 정보 수정을 처리하고 성공 시 바뀐 정보를 반영한 JWT와 true를 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> update(@RequestBody UserDTO user, HttpServletRequest request, HttpServletResponse response) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            User origin = userService.findById(loginUserId);

            user.setId(origin.getId());
            user.setGender(origin.getGender());
            user.setEvaluation(origin.getEvaluation());
            user.setSocialLogin(origin.getSocialLogin());
            user.setProfilePhotoDir(origin.getProfilePhotoDir());

            User updatedUser = userService.update(user.insertOrUpdateEntity(origin.getPw()));
            response.setHeader("jwt-auth-token", jwtService.create(updatedUser.getId()));

            return new ResponseEntity<>(new CommonResponse(new UserDTO(updatedUser.getId(), updatedUser.getNickname()),
                    "update", "SUCCESS", "정보 수정이 완료되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("update");
        }
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴 성공시 state에 SUCCESS, 실패시 FAIL 반환", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> delete(HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            userService.delete(loginUserId);
            return new ResponseEntity<>(new CommonResponse("delete", "SUCCESS", "회원 탈퇴 되었습니다."), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException("delete");
        }
    }

    @GetMapping("/validateEmail/{email}")
    @ApiOperation(value = "이메일 중복확인 사용 가능할 때 res.data.state에 SUCCESS 문자열을 리턴하고" +
            "이미 가입된 이메일이라면 FAIL 문자열을 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> validateEmail(@PathVariable String email) {
        if (userService.isExistEmail(email)) {
            EmailService emailService = new EmailService();
            String sub = "스터디의 발견 이메일 인증입니다.";
            int ran = new Random().nextInt(100000) + 10000;
            String dice = ran+"";
            Map<String, String> result = new HashMap<>();
            emailService.sendMail(email, sub, dice);
            result.put("dice", dice);
            return new ResponseEntity<>(new CommonResponse(result,"validateEmail", "SUCCESS", "사용할 수 있는 이메일입니다."), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new CommonResponse("validateEmail", "FAIL", "사용할 수 없는 이메일입니다."), HttpStatus.OK);
        }
    }

    @GetMapping("/validateNickname/{nickname}")
    @ApiOperation(value = "닉네임 중복확인 사용 가능할 때 res.data.state에 SUCCESS 문자열을 리턴하고" +
            "이미 가입된 닉네임이라면 FAIL 문자열을 리턴한다.", response = CommonResponse.class)
    public ResponseEntity<CommonResponse> validateNickname(@PathVariable String nickname) {
        if (userService.isExistNickname(nickname)) {
            return new ResponseEntity<>(new CommonResponse("validateNickname", "SUCCESS", "사용할 수 있는 닉네임입니다."), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new CommonResponse("validateNickname", "FAIL", "사용할 수 없는 닉네임입니다."), HttpStatus.OK);
        }
    }
    //비밀번호 찾기 (이메일로 임시 비밀번호를 보내고 임시비밀번호로 디비 비번 변경)
    @GetMapping("/findPassword")
    public  ResponseEntity<CommonResponse> findPassword(@PathVariable String email) {
        if (userService.isExistEmail(email)) {
            EmailService emailService = new EmailService();
            String sub = "스터디의 발견 임시 비밀번호 입니다.";
            int ran = new Random().nextInt(10000000) + 1000000;
            String dice = ran+"";
            Map<String, String> result = new HashMap<>();
            emailService.sendMail(email, sub, dice);
            userService.updatePassword(email, dice);
            result.put("dice", dice);
            return new ResponseEntity<>(new CommonResponse(result,"validateEmail", "SUCCESS", "이메일로 임시비밀번호가 전송되었습니다."), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new CommonResponse("validateEmail", "FAIL", "등록되지 않은 이메일입니다."), HttpStatus.OK);
        }
    }

    //비밀번호 수정

    @PostMapping("/profileUpload")
    public ResponseEntity<CommonResponse> profileUpload(@RequestBody MultipartFile file, HttpServletRequest request) {
        try {
            int loginUserId = jwtService.getLoginUserId(request);
            User user = userService.findById(loginUserId);
            if (!user.getProfilePhotoDir().equals("default.png")) {
                profileService.deleteFile(user.getProfilePhotoDir());
            }
            String fileName = profileService.saveFile(file, user.getId() + "");
            if(fileName == null) fileName = "default.png";
            user.setProfilePhotoDir(fileName);

            UserDTO userDTO = userService.profile(user).myPageDTO();
            return new ResponseEntity<>(new CommonResponse(userDTO,"profileUpload", "SUCCESS", "프로필 사진 변경 완료."), HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException("profileUpload");
        }

    }

    @PostMapping(value = "/auth")
    public ResponseEntity<CommonResponse> snsLoginCallBack(HttpServletResponse response, @RequestBody SocialParam param) throws Exception {
        String code = param.getCode();
        String service = param.getService();
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
        UserDTO userDTO = new UserDTO();
        if (userService.isExistSocialLogin(user.getSocialLogin())) {
            user = userService.findBySocialLogin(user.getSocialLogin());
            try {
                response.setHeader("jwt-auth-token", jwtService.create(user.getId()));
                userDTO.setId(user.getId());
                userDTO.setNickname(user.getNickname());
                return new ResponseEntity<>(new CommonResponse(userDTO, "signIn", "SUCCESS", "로그인에에 성공했습니다."), HttpStatus.OK);
            } catch (RuntimeException e) {
                e.printStackTrace();
                throw new RuntimeException("signIn");
            }
        } else {
            userDTO.setEmail(user.getSocialLogin());
            userDTO.setNickname(user.getNickname());
            userDTO.setSocialLogin(user.getSocialLogin());
            userDTO.setCity("서울");
            return signUp(userDTO, response);
        }
    }
}

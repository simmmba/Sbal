package com.ssafy.sval.controller;

import com.ssafy.sval.exceptions.InvalidUserInfoException;
import com.ssafy.sval.jwt.JwtService;
import com.ssafy.sval.model.entity.User;
import com.ssafy.sval.model.service.UserService;
import com.ssafy.sval.responseType.CommonResponse;
import com.ssafy.sval.social.SnsLogin;
import com.ssafy.sval.social.SnsValue;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin({"*"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    private SnsValue naverSns;
    private SnsValue kakaoSns;

   @ExceptionHandler
    public Map<String, String> errorHandler(Exception e){
        Map<String, String> map = new HashMap<>();
        map.put("result", "error");
        return map;
    }

    @GetMapping("/loginForm")
    public Map<String,String> loginForm(){

        naverSns = new SnsValue("naver", "ZaZ22Ro1uzKMK_w_pbkX","QDpGVk3dcT", "http://localhost:8080/user/auth/naver/callback");
        SnsLogin sl = new SnsLogin(naverSns);
        String naverUrl = sl.getSnsAuthURL();
        kakaoSns = new SnsValue("kakao", "65c8c65086b415b91d2decea051f2765", null , "http://localhost:8080/user/auth/kakao/callback");
        String kakaoUrl = "https://kauth.kakao.com/oauth/authorize?" + "client_id=" +kakaoSns.getClientId() + "&redirect_uri=" + kakaoSns.getRedirectUrl()+ "&response_type=code";
        Map<String, String> map = new HashMap<>();
        map.put("naverUrl", naverUrl);
        map.put("kakaoUrl", kakaoUrl);

        return map;
    }

    @RequestMapping(value =  "/auth/{service}/callback", method= {RequestMethod.GET , RequestMethod.POST})
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
        if(userService.isExistEmail(user.getEmail())) {
            //  true : exist
        } else {
            // false : not exist
        }
        return user;
    }

    @GetMapping("/users")
    public List<User> findAll(){
       return userService.findAll();
    }

    @PostMapping("/{user}")
    public Map<String, String> insert(@RequestBody User user) {
        Map<String, String> map = userService.insert(user);
        return map;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입을 처리하고, 새로 가입한 회원의 정보를 리턴한다.", response = User.class)
    public ResponseEntity<Object> registerNewUser(@RequestBody User user){
        try {
            User newUser = userService.signup(user);
            return new ResponseEntity<Object>(newUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<Object>(e, HttpStatus.CONFLICT);
        }

    }


    @GetMapping("/checkemail/{email}")
    public ResponseEntity<Object> checkDuplicateEmail(@PathVariable String email){
        if(userService.isExistEmail(email)) {
            return new ResponseEntity<Object>(new BoolResult("checkDuplicateEmail", true, "SUCCESS"), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(new BoolResult("checkDuplicateEmail", false, "FAIL"), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/checknickname/{nickname}")
    public ResponseEntity<Object> checkDuplicateNickname(@PathVariable String nickname){
        if(userService.isExistNickname(nickname)) {
            return new ResponseEntity<Object>(new BoolResult("checkDuplicateNickname", true, "SUCCESS"), HttpStatus.OK);
        } else {
            return new ResponseEntity<Object>(new BoolResult("checkDuplicateNickname", false, "FAIL"), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> signIn(@RequestBody User user, HttpServletResponse response) {
        try {
            User loginUser = userService.signIn(user.getEmail(), user.getPw());
            String token = jwtService.create(loginUser);
            response.setHeader("jwt-auth-token", token);
            return new ResponseEntity<Object>(loginUser, HttpStatus.OK);
        } catch (InvalidUserInfoException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("서비스가 원활하지 않습니다. 잠시 후 시도해주세요.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

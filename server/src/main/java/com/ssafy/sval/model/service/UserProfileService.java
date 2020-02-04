package com.ssafy.sval.model.service;

import com.ssafy.sval.config.UserProfileUploadProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class UserProfileService {

    private final Path fileLocation;

    @Autowired
    public UserProfileService(UserProfileUploadProperties prop){
        this.fileLocation = Paths.get(prop.getUploadDir())
                .toAbsolutePath().normalize();
    }

    public String saveFile(MultipartFile file, String userId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        fileName  = userId + fileName;
        try {
            if (fileName.contains("..")) return "부적절한이름";

            Path targetLocation = this.fileLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return this.fileLocation+"/"+fileName;
        } catch (Exception e){
            return "실패";
        }
    }

    public void deleteFile(String fileName) {
        File file = new File(fileName);
        if(file.exists()){
            file.delete();
        }
    }
}

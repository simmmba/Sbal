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

        if(fileName.equals("default.png")) return fileName;

        fileName  = userId + fileName;
        System.out.println(fileName);
        System.out.println(this.fileLocation);
        try {
            if (fileName.contains("..")) return null;

            Path targetLocation = this.fileLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (Exception e){
            return null;
        }
    }

    public void deleteFile(String fileName) {
        File file = new File(this.fileLocation+"/"+fileName);
        if(file.exists()){
            file.delete();
        }
    }
}

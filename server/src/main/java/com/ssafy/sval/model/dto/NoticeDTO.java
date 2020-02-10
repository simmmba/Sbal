package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.Notice;
import com.ssafy.sval.model.entity.Study;
import com.ssafy.sval.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {

    private Integer id;
    private String title;
    private String content;
    private Integer studyId;
    private Integer writer;
    private int hits;
    private String date;

    private List<ReplyDTO> replyList = new ArrayList<>();

    public Notice toEntity(Integer writer){
        Study study = new Study();
        study.setId(studyId);
        this.writer = writer;
        User user = new User();
        user.setId(writer);
        Notice notice = new Notice(id, title, content, user, study, hits,date, new ArrayList<>() );
        return notice;
    }
}

package com.ssafy.sval.model.dto;

import com.ssafy.sval.model.entity.Notice;
import com.ssafy.sval.model.entity.Reply;
import com.ssafy.sval.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ReplyDTO {

    private Integer id;
    private String content;
    private Integer noticeId;
    private Integer writer;
    private String date;


    public Reply toEntity(Integer writer){
        Notice notice = new Notice();
        notice.setId(noticeId);
        this.writer = writer;
        User user = new User();
        user.setId(writer);
        Reply reply = new Reply(id, content, notice, user, date);
        return reply;
    }

}

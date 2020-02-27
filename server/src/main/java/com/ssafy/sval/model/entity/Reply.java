package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.ReplyDTO;
import com.ssafy.sval.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter
@Entity @Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;

    @ManyToOne @JoinColumn(name = "notice_id")
    private Notice notice;

    @ManyToOne @JoinColumn(name = "writer")
    private User writer;
    private String date;

    public ReplyDTO toDTO(){
        ReplyDTO replyDTO = new ReplyDTO(id, content, notice.getId(),
                new UserDTO(writer.getId(), writer.getNickname(), writer.getProfilePhotoDir()) ,date);
        return replyDTO;
    }
}

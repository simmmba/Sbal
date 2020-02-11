package com.ssafy.sval.model.entity;

import com.ssafy.sval.model.dto.NoticeDTO;
import com.ssafy.sval.model.dto.ReplyDTO;
import com.ssafy.sval.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Entity @Table(name="NOTICE")
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String content;
    @ManyToOne @JoinColumn(name="writer")
    private User writer;
    @ManyToOne @JoinColumn(name="study_id")
    private Study study;
    private int hits;
    private String date;

    @OneToMany(mappedBy = "notice")
    private List<Reply> replyList = new ArrayList<>();

    public NoticeDTO toDTO(){
        NoticeDTO notice = new NoticeDTO(id, title, content, study.getId(),
                writer.getId(), hits, date, null);
        List<ReplyDTO> replyDTOS = new ArrayList<>();
        for(Reply r : replyList) replyDTOS.add(r.toDTO());
        notice.setReplyList(replyDTOS);
        return notice;
    }
}

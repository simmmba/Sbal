package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Notice;
import com.ssafy.sval.model.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {

    @Autowired
    NoticeRepository nRepo;

    public Notice insert(Notice notice) {
        return nRepo.save(notice);
    }
    public Notice update(Notice notice) {
        return nRepo.save(notice);
    }
    public Notice getNoticeDetail(Integer id) {
        Notice notice = nRepo.findById(id).get();
        notice.setHits(notice.getHits()+1);
        notice  = nRepo.save(notice);
        return notice;
    }

    public void increaseHits(Integer noticeId) {
        Notice notice = nRepo.findById(noticeId).get();
        notice.setHits(notice.getHits()+1);
        nRepo.save(notice);
    }

    public Notice getNotice(Integer id) {
        return nRepo.findById(id).get();
    }

    public void delete(Integer id) {
        nRepo.deleteById(id);
    }
}

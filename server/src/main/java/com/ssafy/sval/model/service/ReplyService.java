package com.ssafy.sval.model.service;

import com.ssafy.sval.model.entity.Reply;
import com.ssafy.sval.model.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {

    @Autowired
    ReplyRepository rRepo;

    public Reply insert(Reply reply) {
        return rRepo.save(reply);
    }
    public Reply update(Reply reply) {
        return rRepo.save(reply);
    }
    public Reply getNoticeDetail(Integer id) { return rRepo.findById(id).get();}
    public void delete(Integer id) {
        rRepo.deleteById(id);
    }

}

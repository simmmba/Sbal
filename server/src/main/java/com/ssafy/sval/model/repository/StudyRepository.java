package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    boolean deleteStudyById(Integer id);
    List<Study> findTop5ByStateOrderByEnrollDateDesc(Integer state);
    List<Study> findTop5ByStateOrderByHitsDesc(Integer state);
}
package com.ssafy.sval.model.repository;

import com.ssafy.sval.model.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    boolean deleteStudyById(Integer id);
}

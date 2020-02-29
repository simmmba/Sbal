package com.ssafy.sval.util;

import com.ssafy.sval.model.entity.Study;
import org.springframework.data.jpa.domain.Specification;

public class StudySpecs {
    public Specification<Study> init() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("state"), 0);
    }
    public Specification<Study> lCategoryIs(final String lCategory) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("lCategory"), lCategory);
    }
    public Specification<Study> sCategoryIs(final String sCategory) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("sCategory"), sCategory);
    }
    public Specification<Study> cityIs(final String city) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("city"), city);
    }
    public Specification<Study> townIs(final String town) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("town"), town);
    }
    public Specification<Study> onlineStateIs(final boolean isOnline) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("isOnline"), isOnline);
    }
    public Specification<Study> dayStateIs(final Integer weekdayOrWeekend) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.<Study>get("weekdayOrWeekend"), weekdayOrWeekend);
    }
    public Specification<Study> leaderLike(final String searchText) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.<Study>get("leader").get("nickname"), "%".concat(searchText).concat("%"));
    }
    public Specification<Study> titleLike(final String searchText) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.<Study>get("title").as(String.class), "%".concat(searchText).concat("%"));
    }
}

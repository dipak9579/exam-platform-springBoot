package com.examPlatform.Repository;

import com.examPlatform.Model.StudentExamSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentExamSubmissionRepository extends JpaRepository<StudentExamSubmission, Long> {
    Optional<StudentExamSubmission> findTopByStudentEmailAndExamIdOrderByIdDesc(String email, Long examId);

}

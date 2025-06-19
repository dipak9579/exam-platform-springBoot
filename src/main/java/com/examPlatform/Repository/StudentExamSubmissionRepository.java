package com.examPlatform.Repository;

import com.examPlatform.DTO.LeaderboardEntryDTO;
import com.examPlatform.Model.StudentExamSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentExamSubmissionRepository extends JpaRepository<StudentExamSubmission, Long> {
    Optional<StudentExamSubmission> findTopByStudentEmailAndExamIdOrderByIdDesc(String email, Long examId);

    List<StudentExamSubmission> findByStudentEmail(String email); // ✅ NEW



    @Query("SELECT new com.examPlatform.DTO.LeaderboardEntryDTO(s.studentEmail, SUM(s.totalMarks)) " +
            "FROM StudentExamSubmission s GROUP BY s.studentEmail ORDER BY SUM(s.totalMarks) DESC")
    List<LeaderboardEntryDTO> getOverallLeaderboard();



}

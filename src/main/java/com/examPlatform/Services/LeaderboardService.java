package com.examPlatform.Services;

import com.examPlatform.DTO.LeaderboardEntryDTO;
import com.examPlatform.Repository.StudentExamSubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {

    private final StudentExamSubmissionRepository submissionRepository;

    public LeaderboardService(StudentExamSubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public List<LeaderboardEntryDTO> getOverallLeaderboard() {
        return submissionRepository.getOverallLeaderboard();
    }
}

package com.examPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamResultDTO {
    private String studentEmail;
    private Long examId;
    private String examTitle;       // ✅ NEW
    private int totalMarks;
    private LocalDateTime submittedAt;
}

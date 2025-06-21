package com.examPlatform.DTO;



import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentExamAnalyticsDTO {
    private String examTitle;
    private int obtainedMarks;
    private int totalQuestions;
    private int correctAnswers;
}

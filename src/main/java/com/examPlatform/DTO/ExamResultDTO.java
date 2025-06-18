package com.examPlatform.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamResultDTO {
    private String studentEmail;
    private Long examId;
    private int totalMarks;
}

package com.examPlatform.DTO;

import lombok.Data;
import java.util.List;

@Data
public class ExamSubmissionDTO {
    private Long examId;
    private String studentEmail;

    private List<AnswerDTO> answers;

    @Data
    public static class AnswerDTO {
        private Long questionId;
        private String givenAnswer;
    }
}

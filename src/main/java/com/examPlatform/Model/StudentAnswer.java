package com.examPlatform.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentAnswer {
    @Id
    @GeneratedValue
    private Long id;

    private Long questionId;
    private String givenAnswer;
    private int marksAwarded;

    @ManyToOne
    private StudentExamSubmission submission;
}

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String givenAnswer;   // Student's submitted answer
    private int marksAwarded;     // Marks awarded for this answer

    @ManyToOne
    @JoinColumn(name = "submission_id")
    private StudentExamSubmission submission;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;    // Link to the actual question
}

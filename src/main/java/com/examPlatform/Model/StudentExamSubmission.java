package com.examPlatform.Model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "student_exam_submission",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_email", "exam_id"}))
public class StudentExamSubmission {
    @Id
    @GeneratedValue
    private Long id;

    private String studentEmail;
    private int totalMarks;

    @ManyToOne
    private Exam exam;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
    private List<StudentAnswer> answers;
}

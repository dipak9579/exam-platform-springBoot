package com.examPlatform.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentExamSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail;

    private int totalMarks;

    private LocalDateTime submittedAt;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
    private List<StudentAnswer> answers;

    @PrePersist
    public void setSubmittedAtNow() {
        this.submittedAt = LocalDateTime.now();
    }


}

package com.examPlatform.Controller;

import com.examPlatform.Model.Exam;
import com.examPlatform.Model.Question;
import com.examPlatform.Repository.ExamRepository;
import com.examPlatform.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/exams")
@PreAuthorize("hasRole('ADMIN')")
public class QuestionController {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/{examId}/questions")
    public ResponseEntity<?> addQuestionToExam(@PathVariable Long examId, @RequestBody Question question) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found with id: " + examId));

        question.setExam(exam); // associate question with exam
        Question saved = questionRepository.save(question);
        return ResponseEntity.ok(saved);
    }
}

package com.examPlatform.Controller;

import com.examPlatform.DTO.ExamResultDTO;
import com.examPlatform.DTO.ExamSubmissionDTO;
import com.examPlatform.Model.Exam;
import com.examPlatform.Model.StudentExamSubmission;
import com.examPlatform.Repository.ExamRepository;
import com.examPlatform.Services.ExamService;
import com.examPlatform.Services.ExamSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentExamController {

    private final ExamRepository examRepository;
    private final ExamSubmissionService submissionService;
    private final ExamService examService;

    @GetMapping("/exam/all")
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExamsWithoutQuestions();
        return ResponseEntity.ok(exams);
    }

    @PostMapping("/start/{examId}")
    public ResponseEntity<String> startExam(@PathVariable Long examId, @RequestParam String email) {
        // You could log the start or do nothing if tracking isn't required
        return ResponseEntity.ok("Exam started for " + email);
    }

    @GetMapping("/exam/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Optional<Exam> exam = examRepository.findById(id);
        return exam.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/exam/submit")
    public ResponseEntity<Map<String, Object>> submitExam(@RequestBody ExamSubmissionDTO submissionDTO) {
        StudentExamSubmission submission = submissionService.submitExam(submissionDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("totalMarks", submission.getTotalMarks());
        response.put("examId", submission.getExam().getId());
        response.put("email", submission.getStudentEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exam/submitted/{email}/{examId}")
    public ResponseEntity<Boolean> hasSubmitted(
            @PathVariable String email,
            @PathVariable Long examId) {
        boolean submitted = submissionService
                .hasStudentSubmittedExam(email, examId);
        return ResponseEntity.ok(submitted);
    }



    @GetMapping("/exam/result/{email}/{examId}")
    public ResponseEntity<ExamResultDTO> getResult(
            @PathVariable String email,
            @PathVariable Long examId) {

        ExamResultDTO result = submissionService.getResultByStudentAndExam(email, examId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/exam/results/{email}")
    public ResponseEntity<List<ExamResultDTO>> getAllResultsForStudent(@PathVariable String email) {
        List<ExamResultDTO> results = submissionService.getResultsByEmail(email);
        return ResponseEntity.ok(results);
    }



}

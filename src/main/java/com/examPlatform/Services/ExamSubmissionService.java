package com.examPlatform.Services;

import com.examPlatform.DTO.ExamResultDTO;
import com.examPlatform.DTO.ExamSubmissionDTO;
import com.examPlatform.Model.*;
import com.examPlatform.Repository.ExamRepository;
import com.examPlatform.Repository.StudentExamSubmissionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExamSubmissionService {

    private final ExamRepository examRepository;
    private final StudentExamSubmissionRepository submissionRepository;
    @Transactional
    public StudentExamSubmission submitExam(ExamSubmissionDTO submissionDTO) {
        Exam exam = examRepository.findById(submissionDTO.getExamId()).orElseThrow();

        int totalMarks = 0;
        List<StudentAnswer> answers = new ArrayList<>();

        for (ExamSubmissionDTO.AnswerDTO answerDTO : submissionDTO.getAnswers()) {
            Question question = exam.getQuestions().stream()
                    .filter(q -> q.getId().equals(answerDTO.getQuestionId()))
                    .findFirst()
                    .orElseThrow();

            // Convert correctAnswer (A/B/C/D) to actual option text
            String correctOptionText = switch (question.getCorrectAnswer().toUpperCase()) {
                case "A" -> question.getOptionA();
                case "B" -> question.getOptionB();
                case "C" -> question.getOptionC();
                case "D" -> question.getOptionD();
                default -> "";
            };

            System.out.println("Correct Answer: " + correctOptionText);
            System.out.println("Given Answer: " + answerDTO.getGivenAnswer());

            int awardedMarks = answerDTO.getGivenAnswer().equalsIgnoreCase(correctOptionText) ? question.getMarks() : 0;
            System.out.println("Awarded Marks: " + awardedMarks);

            totalMarks += awardedMarks;

            StudentAnswer studentAnswer = StudentAnswer.builder()
                    .questionId(question.getId())
                    .givenAnswer(answerDTO.getGivenAnswer())
                    .marksAwarded(awardedMarks)
                    .build();

            answers.add(studentAnswer);
        }

        System.out.println("Total Marks to Save: " + totalMarks);

        StudentExamSubmission submission = StudentExamSubmission.builder()
                .studentEmail(submissionDTO.getStudentEmail())
                .exam(exam)
                .totalMarks(totalMarks)
                .build();

        for (StudentAnswer answer : answers) {
            answer.setSubmission(submission);
        }

        submission.setAnswers(answers);
        return submissionRepository.save(submission);
    }

    public ExamResultDTO getResultByStudentAndExam(String email, Long examId) {
        StudentExamSubmission submission = submissionRepository
                .findTopByStudentEmailAndExamIdOrderByIdDesc(email, examId)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        ExamResultDTO dto = new ExamResultDTO();
        dto.setStudentEmail(submission.getStudentEmail());
        dto.setExamId(submission.getExam().getId());
        dto.setTotalMarks(submission.getTotalMarks()); // You must have this field in your Entity

        return dto;
    }








}

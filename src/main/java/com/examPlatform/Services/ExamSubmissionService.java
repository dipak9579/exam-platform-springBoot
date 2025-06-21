package com.examPlatform.Services;

import com.examPlatform.DTO.ExamResultDTO;
import com.examPlatform.DTO.ExamSubmissionDTO;
import com.examPlatform.DTO.StudentExamAnalyticsDTO;
import com.examPlatform.Model.*;
import com.examPlatform.Repository.ExamRepository;
import com.examPlatform.Repository.StudentExamSubmissionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ExamSubmissionService {

    private final ExamRepository examRepository;
    private final StudentExamSubmissionRepository submissionRepository;
    @Transactional
    public StudentExamSubmission submitExam(ExamSubmissionDTO submissionDTO) {
        // Check if student already submitted
        Optional<StudentExamSubmission> existingSubmission =
                submissionRepository.findTopByStudentEmailAndExamIdOrderByIdDesc(
                        submissionDTO.getStudentEmail(), submissionDTO.getExamId());

        if (existingSubmission.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already submitted this exam.");
        }


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
                    .question(question) // ✅ pass the entire Question object here
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

    public boolean hasStudentSubmittedExam(String email, Long examId) {
        return submissionRepository
                .findTopByStudentEmailAndExamIdOrderByIdDesc(email, examId)
                .isPresent();
    }


    public ExamResultDTO getResultByStudentAndExam(String email, Long examId) {
        StudentExamSubmission submission = submissionRepository
                .findTopByStudentEmailAndExamIdOrderByIdDesc(email, examId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Result not found"));

        ExamResultDTO dto = new ExamResultDTO();
        dto.setStudentEmail(submission.getStudentEmail());
        dto.setExamId(submission.getExam().getId());
        dto.setTotalMarks(submission.getTotalMarks());

        return dto;
    }

    public List<ExamResultDTO> getResultsByEmail(String email) {
        List<StudentExamSubmission> submissions = submissionRepository.findByStudentEmail(email);

        return submissions.stream().map(submission -> {
            ExamResultDTO dto = new ExamResultDTO();
            dto.setStudentEmail(submission.getStudentEmail());
            dto.setExamId(submission.getExam().getId());
            dto.setTotalMarks(submission.getTotalMarks());
            dto.setExamTitle(submission.getExam().getTitle());
            dto.setSubmittedAt(submission.getSubmittedAt()); // ✅ Use the correct field
            return dto;
        }).toList();
    }

    public Map<String, Object> getStudentAnalytics(String studentEmail) {
        List<StudentExamSubmission> submissions = submissionRepository.findByStudentEmail(studentEmail);

        int totalExams = submissions.size();
        int totalMarks = 0;
        int totalCorrectAnswers = 0;
        int totalQuestions = 0;

        for (StudentExamSubmission submission : submissions) {
            totalMarks += submission.getTotalMarks();
            List<StudentAnswer> answers = submission.getAnswers();

            for (StudentAnswer ans : answers) {
                totalQuestions++;
                String correctAnswer = switch (ans.getQuestion().getCorrectAnswer().toUpperCase()) {
                    case "A" -> ans.getQuestion().getOptionA();
                    case "B" -> ans.getQuestion().getOptionB();
                    case "C" -> ans.getQuestion().getOptionC();
                    case "D" -> ans.getQuestion().getOptionD();
                    default -> "";
                };

                if (ans.getGivenAnswer().equalsIgnoreCase(correctAnswer)) {
                    totalCorrectAnswers++;
                }
            }
        }

        double averageMarks = totalExams == 0 ? 0 : (double) totalMarks / totalExams;
        double accuracy = totalQuestions == 0 ? 0 : ((double) totalCorrectAnswers / totalQuestions) * 100;

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalExams", totalExams);
        analytics.put("totalMarks", totalMarks);
        analytics.put("averageMarks", averageMarks);
        analytics.put("accuracy", accuracy);

        return analytics;
    }








}

package com.examPlatform.Services;

import com.examPlatform.Model.Exam;
import com.examPlatform.Model.Question;
import com.examPlatform.Repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;





    public Exam createExam(Exam exam) {
        if (exam.getQuestions() != null) {
            for (Question q : exam.getQuestions()) {
                q.setExam(exam);  // Set the foreign key
            }
        }
        return examRepository.save(exam);
    }


    public Exam getExamWithQuestions(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        // Remove correct answers before sending to student
        exam.getQuestions().forEach(q -> q.setCorrectAnswer(null));

        return exam;
    }


    public List<Exam> getAllExamsWithoutQuestions() {
        List<Exam> exams = examRepository.findAll();
        exams.forEach(exam -> exam.setQuestions(null)); // Hide questions
        return exams;
    }
}

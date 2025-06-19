package com.examPlatform.DTO;

public class LeaderboardEntryDTO {
    private String studentEmail;
    private Long totalMarks;

    public LeaderboardEntryDTO(String studentEmail, Long totalMarks) {
        this.studentEmail = studentEmail;
        this.totalMarks = totalMarks;
    }

    // Getters and setters
    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Long getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(Long totalMarks) {
        this.totalMarks = totalMarks;
    }
}

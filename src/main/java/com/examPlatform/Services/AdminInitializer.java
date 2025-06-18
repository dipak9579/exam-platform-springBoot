package com.examPlatform.Services;

import com.examPlatform.Model.Users;
import com.examPlatform.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initAdmin() {
        if (userRepository.findByEmail("admin@exam.com").isEmpty()) {
            Users admin = Users.builder()
                    .email("admin@exam.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Users.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Admin initialized.");
        }
    }
}
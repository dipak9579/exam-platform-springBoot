package com.examPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String message;

    // You can also add custom constructors if needed
    public AuthResponse(String message) {
        this.message = message;
    }
}

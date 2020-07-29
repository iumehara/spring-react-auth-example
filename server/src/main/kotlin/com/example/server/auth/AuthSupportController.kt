package com.example.server.auth

import com.example.server.dto.BooleanDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthSupportController {
    @GetMapping("pre-login")
    fun setCSRFBeforeLogin(): BooleanDto {
        return BooleanDto(true)
    }

    @PostMapping("post-logout")
    fun handleSuccessfulLogout(): BooleanDto {
        return BooleanDto(true)
    }
}

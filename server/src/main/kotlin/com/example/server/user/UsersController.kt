package com.example.server.user

import com.example.server.dto.UserDto
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("users")
class UsersController() {

    @PostMapping("current")
    fun current(): UserDto {
        val authentication = SecurityContextHolder.getContext().authentication
        val user = authentication.principal as User
        return UserDto(user.username)
    }
}
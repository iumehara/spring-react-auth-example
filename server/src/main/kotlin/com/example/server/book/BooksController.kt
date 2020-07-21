package com.example.server.book

import com.example.server.dto.Book
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("books")
class BooksController(val bookRepo: BookRepo) {
    @GetMapping
    fun getAll(): List<Book> {
        return bookRepo.getall()
    }
}
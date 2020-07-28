package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.IntDto
import com.example.server.dto.NewBookDto
import org.springframework.http.HttpStatus.CREATED
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("books")
class BooksController(val bookRepo: BookRepo) {
    @GetMapping
    fun getAll(): List<BookDto> {
        return bookRepo.getAll()
    }

    @PostMapping
    @ResponseStatus(CREATED)
    fun create(@RequestBody newBook: NewBookDto): IntDto {
        return bookRepo.create(newBook)
    }
}
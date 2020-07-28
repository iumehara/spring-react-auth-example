package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.IntDto
import com.example.server.dto.NewBookDto

interface BookRepo {
    fun getAll(): List<BookDto>
    fun create(newBook: NewBookDto): IntDto
}

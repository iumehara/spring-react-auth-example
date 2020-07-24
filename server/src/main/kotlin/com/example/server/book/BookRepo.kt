package com.example.server.book

import com.example.server.dto.BookDto

interface BookRepo {
    fun getall(): List<BookDto>
}

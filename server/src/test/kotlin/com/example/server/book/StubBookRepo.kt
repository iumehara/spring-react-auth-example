package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.IntDto
import com.example.server.dto.NewBookDto

class StubBookRepo : BookRepo {
    override fun getAll(): List<BookDto> {
        return listOf(
                BookDto(1, "Catcher in the Rye"),
                BookDto(2, "To Kill a Mockingbird")
        )
    }

    override fun create(newBook: NewBookDto): IntDto {
        return IntDto(1)
    }
}
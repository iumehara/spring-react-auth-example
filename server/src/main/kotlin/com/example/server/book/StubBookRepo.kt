package com.example.server.book

import com.example.server.dto.BookDto
import org.springframework.stereotype.Repository

@Repository
class StubBookRepo: BookRepo {
    override fun getall(): List<BookDto> {
        return listOf(
                BookDto("Catcher in the Rye"),
                BookDto("To Kill a Mockingbird")
        )
    }
}
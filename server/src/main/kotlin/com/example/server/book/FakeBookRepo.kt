package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.IntDto
import com.example.server.dto.NewBookDto
import org.springframework.stereotype.Repository

@Repository
class FakeBookRepo : BookRepo {
    var currentIndex = 2

    val books = mutableListOf<BookDto>(
            BookDto(1, "Catcher in the Rye"),
            BookDto(2, "To Kill a Mockingbird")
    )

    override fun getAll(): List<BookDto> {
        return books
    }

    override fun create(newBook: NewBookDto): IntDto {
        currentIndex += 1
        books.add(BookDto(currentIndex, newBook.title))
        return IntDto(currentIndex)
    }
}
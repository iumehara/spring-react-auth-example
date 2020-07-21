package com.example.server.book

import com.example.server.dto.Book
import org.springframework.stereotype.Repository

@Repository
class StubBookRepo: BookRepo {
    override fun getall(): List<Book> {
        return listOf(
                Book("Catcher in the Rye"),
                Book("To Kill a Mockingbird")
        )
    }
}
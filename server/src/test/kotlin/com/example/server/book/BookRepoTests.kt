package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.NewBookDto
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

abstract class BookRepoTests {
    lateinit var repo: BookRepo
    abstract fun createRepo(): BookRepo

    @BeforeEach
    fun setUp() {
        repo = createRepo()
    }

    @Test
    fun create_adds_toList() {
        val books = repo.getAll()

        assertThat(books.size).isEqualTo(2)
        assertThat(books[0]).isEqualTo(BookDto(1, "Catcher in the Rye"))
        assertThat(books[1]).isEqualTo(BookDto(2, "To Kill a Mockingbird"))

        repo.create(NewBookDto("Huckleberry Finn"))

        assertThat(books.size).isEqualTo(3)
        assertThat(books[2]).isEqualTo(BookDto(3, "Huckleberry Finn"))
    }
}
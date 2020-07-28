package com.example.server.book

import com.example.server.dto.BookDto
import com.example.server.dto.IntDto
import com.example.server.dto.NewBookDto

class SpyBookRepo : BookRepo {
    var create_arg_newBook: NewBookDto? = null
    var getAll_wasCalled = false

    override fun getAll(): List<BookDto> {
        getAll_wasCalled = true
        return emptyList()
    }

    override fun create(newBook: NewBookDto): IntDto {
        create_arg_newBook = newBook
        return IntDto(0)
    }

}
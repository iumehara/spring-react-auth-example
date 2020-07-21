package com.example.server.book

import com.example.server.dto.Book

interface BookRepo {
    fun getall(): List<Book>
}

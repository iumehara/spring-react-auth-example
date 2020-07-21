package com.example.server.book

import org.hamcrest.CoreMatchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

class BooksControllerTests {
    @Test
    fun all_returnsBooks() {
        val repo = StubBookRepo()
        val controller = standaloneSetup(BooksController(repo)).build()

        val resultActions = controller.perform(get("/books"))

        resultActions.andExpect(status().isOk)
                .andExpect(jsonPath("$[0].title", equalTo("Catcher in the Rye")))
                .andExpect(jsonPath("$[1].title", equalTo("To Kill a Mockingbird")))
    }
}
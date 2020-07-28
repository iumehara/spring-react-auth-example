package com.example.server.book

import com.example.server.dto.NewBookDto
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.CoreMatchers.equalTo
import org.intellij.lang.annotations.Language
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
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
                .andExpect(jsonPath("$[0].id", equalTo(1)))
                .andExpect(jsonPath("$[0].title", equalTo("Catcher in the Rye")))
                .andExpect(jsonPath("$[1].id", equalTo(2)))
                .andExpect(jsonPath("$[1].title", equalTo("To Kill a Mockingbird")))
    }

    @Test
    fun create_callsRepo() {
        val repo = SpyBookRepo()
        val controller = standaloneSetup(BooksController(repo)).build()

        @Language("JSON")
        val requestBody = "{\"title\":\"Huckleberry Finn\"}"
        controller.perform(post("/books")
                .content(requestBody)
                .contentType(APPLICATION_JSON)
                .accept(APPLICATION_JSON))

        assertThat(repo.create_arg_newBook).isEqualTo(NewBookDto("Huckleberry Finn"))
    }

    @Test
    fun create_returnsId() {
        val repo = StubBookRepo()
        val controller = standaloneSetup(BooksController(repo)).build()

        @Language("JSON")
        val requestBody = "{\"title\":\"Huckleberry Finn\"}"
        val resultActions = controller.perform(post("/books")
                .content(requestBody)
                .contentType(APPLICATION_JSON)
                .accept(APPLICATION_JSON))

        resultActions.andExpect(status().isCreated)
                .andExpect(jsonPath("$.value", equalTo(1)))
    }
}
package com.example.server.book

class FakeBookRepoTests : BookRepoTests() {

    override fun createRepo(): BookRepo {
        return FakeBookRepo()
    }
}
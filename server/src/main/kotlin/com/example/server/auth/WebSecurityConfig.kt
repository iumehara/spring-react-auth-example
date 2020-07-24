package com.example.server.auth

import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod.GET
import org.springframework.http.HttpMethod.POST
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter
import javax.sql.DataSource

@EnableWebSecurity
class WebSecurityConfig(val dataSource: DataSource) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http?.authorizeRequests()
                ?.anyRequest()?.authenticated()

        http?.formLogin()
                ?.loginProcessingUrl("/login")?.permitAll()
                ?.successForwardUrl("/users/current")
                ?.failureHandler(SimpleUrlAuthenticationFailureHandler())

        http?.logout()
                ?.logoutUrl("/logout")?.permitAll()
                ?.logoutSuccessUrl("/users/logout-success")

        http?.cors()

        http?.csrf()?.disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        val usernameQuery = "select username, password, enabled from users where username=?"
        auth?.jdbcAuthentication()
                ?.dataSource(dataSource)
                ?.usersByUsernameQuery(usernameQuery)
                ?.passwordEncoder(passwordEncoder())
    }

    @Bean
    fun corsFilter(): CorsFilter {
        val config = CorsConfiguration()
        config.allowCredentials = true
        config.exposedHeaders = listOf("Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "X-CSRF-TOKEN")
        config.allowedOrigins = listOf(System.getenv("CLIENT_URL"))
        config.addAllowedHeader("*")
        config.allowedMethods = listOf(GET.toString(), POST.toString())
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)
        return CorsFilter(source)
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}

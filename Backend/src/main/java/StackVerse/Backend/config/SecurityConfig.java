package StackVerse.Backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // For development purposes, we disable CSRF and allow all requests to the endpoints we created
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/admin/**", "/promotions/**", "/analytics/**").permitAll()
                .anyRequest().permitAll() // Allow all for now so you can test easily
            )
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }
}

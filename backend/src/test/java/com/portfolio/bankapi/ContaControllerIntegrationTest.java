package com.portfolio.bankapi;

import static org.assertj.core.api.Assertions.assertThat;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "spring.jpa.hibernate.ddl-auto=create-drop")
public class ContaControllerIntegrationTest {

    @Autowired
    private TestRestTemplate rest;

    private HttpHeaders jsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Test
    void criarContaComum_deveRetornar201_eCorpo() {
        String body = "{\"tipo\":\"COMUM\",\"numero\":\"TST-COMUM-1\",\"titular\":\"Teste Integration\"}";
        ResponseEntity<String> resp = rest.exchange("/api/contas", HttpMethod.POST, new HttpEntity<>(body, jsonHeaders()), String.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(resp.getBody()).contains("TST-COMUM-1");
        assertThat(resp.getBody()).contains("Teste Integration");
    }

    @Test
    void criarContaEspecial_deveRetornar201_eIncluirLimite() {
        String body = "{\"tipo\":\"ESPECIAL\",\"numero\":\"TST-ESP-1\",\"titular\":\"Especial Integration\",\"limiteChequeEspecial\":1234.5}";
        ResponseEntity<String> resp = rest.exchange("/api/contas", HttpMethod.POST, new HttpEntity<>(body, jsonHeaders()), String.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(resp.getBody()).contains("TST-ESP-1");
        assertThat(resp.getBody()).contains("limiteChequeEspecial");
        assertThat(resp.getBody()).contains("1234.5");
    }

    @Test
    void criarContaPoupanca_deveRetornar201() {
        String body = "{\"tipo\":\"POUPANCA\",\"numero\":\"TST-POU-1\",\"titular\":\"Poupanca Integration\"}";
        ResponseEntity<String> resp = rest.exchange("/api/contas", HttpMethod.POST, new HttpEntity<>(body, jsonHeaders()), String.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(resp.getBody()).contains("TST-POU-1");
    }

    @Test
    void criarContaDuplicada_deveRetornar500ouErroDeDominio() {
        String body = "{\"tipo\":\"COMUM\",\"numero\":\"TST-DUP-1\",\"titular\":\"Dup Integration\"}";
        ResponseEntity<String> resp1 = rest.exchange("/api/contas", HttpMethod.POST, new HttpEntity<>(body, jsonHeaders()), String.class);
        assertThat(resp1.getStatusCode()).isEqualTo(HttpStatus.CREATED);

    ResponseEntity<String> resp2 = rest.exchange("/api/contas", HttpMethod.POST, new HttpEntity<>(body, jsonHeaders()), String.class);
    // comportamento atual: RuntimeException no service causa 500. Apenas garantir que veio erro (4xx/5xx)
    assertThat(resp2.getStatusCode().isError()).isTrue();
    }
}

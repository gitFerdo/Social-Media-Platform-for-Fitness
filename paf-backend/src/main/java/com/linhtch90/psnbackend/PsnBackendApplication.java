package com.linhtch90.psnbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
public class PsnBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PsnBackendApplication.class, args);
	}

}

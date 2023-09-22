package com.example.weddingplan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class WeddingPlanApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeddingPlanApplication.class, args);
    }

}

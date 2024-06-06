package com.rocketteam.passkeeper;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.button.MaterialButton;

public class TermsConditionsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_terms_conditions);



        // Configuración del botón que vuelve a home.
        MaterialButton btnTerms = findViewById(R.id.btn_terms);
        btnTerms.setOnClickListener(v -> {
            Intent intent = new Intent(TermsConditionsActivity.this, ShowPasswordsActivity.class);
            startActivity(intent);
        });
    }


}
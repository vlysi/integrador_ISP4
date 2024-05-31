package com.rocketteam.passkeeper;

import android.content.Intent;

import android.net.Uri;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;

public class AboutActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about);
//-------------------------------- Regresa la activity PasswordActivity--------------------------------------
        // Configuración del boton que vuelve a home.
        MaterialButton btn_about = findViewById(R.id.btn_about);

        //Configuración del botón que lleva al about de la web

        MaterialButton btn_aboutUS = findViewById(R.id.btn_aboutUs);
        btn_aboutUS.setOnClickListener(view -> {
            // Creo un Intent para abrir la URL
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://ang-pass-keeper.vercel.app/#about-us")); //TODO: Agregar URL de AboutUS
            startActivity(browserIntent);
        });

        // Configurar un OnClickListener para el botón
        btn_about.setOnClickListener(view -> {
            // Navegar de vuelta al Passwords
            Intent intent = new Intent(AboutActivity.this, ShowPasswordsActivity.class);
            startActivity(intent);
            finish();
        });
    }

}

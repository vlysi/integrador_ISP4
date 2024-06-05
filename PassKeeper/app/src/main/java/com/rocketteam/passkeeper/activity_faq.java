package com.rocketteam.passkeeper;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.google.android.material.button.MaterialButton;
import android.content.Intent;

public class activity_faq extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_faq);

        // Escuchar cambios en los márgenes de la ventana para ajustar el relleno del contenido
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets barrasSistema = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(barrasSistema.left, barrasSistema.top, barrasSistema.right, barrasSistema.bottom);
            return insets;
        });

        // Configuración del botón que vuelve a home.
        MaterialButton btnNew = findViewById(R.id.btn_new);
        btnNew.setOnClickListener(v -> {
            Intent intent = new Intent(activity_faq.this, ShowPasswordsActivity.class);
            startActivity(intent);
        });
    }
}

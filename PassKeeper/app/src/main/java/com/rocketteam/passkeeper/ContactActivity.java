package com.rocketteam.passkeeper;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import android.widget.TextView;
import android.content.Intent;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.button.MaterialButton;
import android.content.SharedPreferences;
import com.rocketteam.passkeeper.util.NetworkUtils;
import com.rocketteam.passkeeper.util.ShowAlertsUtility;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class ContactActivity extends AppCompatActivity {
    private TextView textViewEmail;
    private TextView textViewContact;
    private TextInputEditText editTextQuery;
    private MaterialButton btnSendQuery;
    private MaterialButton btnBack;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);
        textViewEmail = findViewById(R.id.textViewEmail);
        textViewContact = findViewById(R.id.textViewContact);
        editTextQuery = findViewById(R.id.editTextQuery);
        btnSendQuery = findViewById(R.id.btnSendQuery);
        btnBack = findViewById(R.id.btnBack);

        // Carga el email desde SharedPreferences
        SharedPreferences sharedPreferences = getSharedPreferences("UserLogin", MODE_PRIVATE);
        String userEmail = sharedPreferences.getString("UserEmail", "No Email Found");
        textViewEmail.setText(userEmail);

        btnSendQuery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String query = editTextQuery.getText().toString().trim();
                if (!query.isEmpty()) {
                    NetworkUtils.sendQuery(userEmail, query, new NetworkUtils.NetworkCallback() {
                        @Override
                        public void onSuccess(String result) {
                            ShowAlertsUtility.mostrarSweetAlert(ContactActivity.this, SweetAlertDialog.SUCCESS_TYPE, "Mensaje enviado", "Mensaje enviado correctamente", sweetAlertDialog -> {
                                Intent intent = new Intent(ContactActivity.this, ShowPasswordsActivity.class);
                                startActivity(intent);
                                finish();
                            });
                        }

                        @Override
                        public void onError(Exception e) {
                            Toast.makeText(ContactActivity.this, "Error al enviar la consulta: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {
                    Toast.makeText(ContactActivity.this, "La consulta no puede estar vacía", Toast.LENGTH_SHORT).show();
                }
            }
        });
        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ContactActivity.this, ShowPasswordsActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }
}

package com.rocketteam.passkeeper;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.rocketteam.passkeeper.data.db.DbManager;
import com.rocketteam.passkeeper.util.NetworkUtils;
import com.rocketteam.passkeeper.util.ShowAlertsUtility;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class ContactActivity extends AppCompatActivity {
    private DbManager dbManager;
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
        textViewContact = findViewById(R.id.contactName);
        editTextQuery = findViewById(R.id.editTextQuery);
        btnSendQuery = findViewById(R.id.btnSendQuery);
        btnBack = findViewById(R.id.btnBack);

        dbManager = new DbManager(getApplicationContext());

        // Carga el email desde dbManager con sharedPreferences
        SharedPreferences sharedPreferences = getSharedPreferences("Storage", MODE_PRIVATE);
        String userEmail = dbManager.getEmailById(sharedPreferences.getInt("userId", -1));

        textViewEmail.setText(userEmail);

        btnSendQuery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String query = editTextQuery.getText().toString().trim();
                String name = textViewContact.getText().toString().trim();
                if (!query.isEmpty()) {
                    NetworkUtils.sendQuery(name, userEmail, query, new NetworkUtils.NetworkCallback() {
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

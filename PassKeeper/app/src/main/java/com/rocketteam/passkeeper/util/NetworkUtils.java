package com.rocketteam.passkeeper.util;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class NetworkUtils {

    /**
     * Obtiene el estado premium del usuario desde la API
     *
     * @param userEmail el correo electrónico del usuario
     * @param callback  el objeto PremiumStatusCallback que manejará el resultado o los errores de la operación
     */
    public static void getPremiumStatusFromAPI(String userEmail, PremiumStatusCallback callback) {

        // Valido si el correo electrónico es nulo y llama al callback de error si lo es
        if (userEmail == null) {
            callback.onError(new IllegalArgumentException("El email del usuario no puede ser nulo."));
            return;
        }


        // Ejecuta en  otro hilo
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executorService.execute(() -> {
            //crea un cliente
            OkHttpClient client = new OkHttpClient();

            //cuerpo de la consulta
            RequestBody body = new FormBody.Builder()
                    .add("email", userEmail)
                    .add("key", "SMNVY6k0LcFkW2ygmgrVRNf09Bb2Kjpo")
                    .build();

            Request request = new Request.Builder()
                    .url("https://drf-passkeeper.onrender.com/account/is_premium/")
                    .post(body)
                    .build();

            //Intenta generar una respuesta
            try (Response response = client.newCall(request).execute()) {

                // El cuerpo de la respuesta lo pasa a un string
                String responseBody = response.body().string();
                Log.i("TAG", "NetworkUtils: respuesta de API: " + responseBody);

                // Verifica si la respuesta fue exitosa
                if (response.isSuccessful()) {

                    // Si da verdadero parsea la respuesta JSON
                    JSONObject jsonObject = new JSONObject(responseBody);
                    boolean isPremium = jsonObject.optBoolean("is_premium", false);
                    handler.post(() -> callback.onResult(isPremium));
                } else {
                    // Muestra un error si la respuesta no fue exitosa
                    handler.post(() -> callback.onError(new Exception("Error en la respuesta: " + response.code())));
                }
            } catch (IOException | JSONException e) {
                // Muestra un error  si ocurre una excepción durante la ejecucion
                handler.post(() -> callback.onError(e));
            }
        });
    }
}

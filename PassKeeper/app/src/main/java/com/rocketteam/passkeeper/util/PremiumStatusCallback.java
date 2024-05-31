package com.rocketteam.passkeeper.util;

/**
 * Esta interfaz define un callback para manejar el estado de premium en la aplicación
 *
 *@param isPremium un booleano que indica si el usuario tiene una suscripción premium
 *@param e una excepción que describe el error ocurrido

 */

public interface PremiumStatusCallback {
     void onResult(boolean isPremium);
     void onError(Exception e);
}

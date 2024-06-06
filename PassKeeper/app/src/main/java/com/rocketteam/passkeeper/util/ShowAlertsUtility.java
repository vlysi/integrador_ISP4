package com.rocketteam.passkeeper.util;

import android.content.Context;
import android.util.Log;

import cn.pedant.SweetAlert.SweetAlertDialog;

public class ShowAlertsUtility {

    public static void mostrarSweetAlert(Context context, int tipo, String titulo, String mensaje, SweetAlertDialog.OnSweetClickListener listener) {
        SweetAlertDialog sweetAlertDialog = new SweetAlertDialog(context, tipo);
        sweetAlertDialog.setTitleText(titulo);
        sweetAlertDialog.setContentText(mensaje);

        sweetAlertDialog.setConfirmText("Aceptar");

        sweetAlertDialog.setConfirmClickListener(sweetAlertDialog1 -> {
            sweetAlertDialog1.dismissWithAnimation();
            if (listener != null) {
                listener.onClick(sweetAlertDialog1);
            }
        });

        sweetAlertDialog.show();
    }

    public static SweetAlertDialog mostrarSweetAlertNoPremium(Context context, int tipo, String titulo, String mensaje, SweetAlertDialog.OnSweetClickListener confirmListener, SweetAlertDialog.OnSweetClickListener cancelListener) {
        if (context != null) {
            SweetAlertDialog sweetAlertDialog2 = new SweetAlertDialog(context, tipo);
            sweetAlertDialog2.setTitleText(titulo);
            sweetAlertDialog2.setContentText(mensaje);
            sweetAlertDialog2.setConfirmText("Obtener");
            sweetAlertDialog2.setCancelText("Cancelar");

            sweetAlertDialog2.setConfirmClickListener(sweetAlertDialog1 -> {
                sweetAlertDialog1.dismissWithAnimation();
                if (confirmListener != null) {
                    confirmListener.onClick(sweetAlertDialog1);
                }
            });

            sweetAlertDialog2.setCancelClickListener(sweetAlertDialog1 -> {
                sweetAlertDialog1.dismissWithAnimation();
                if (cancelListener != null) {
                    cancelListener.onClick(sweetAlertDialog1);
                }
            });

            sweetAlertDialog2.show();

            return sweetAlertDialog2; // Devuelve la instancia de la alerta
        } else {
            Log.e("ShowAlertsUtility", "El contexto es nulo en mostrarSweetAlertDeletePassword");
            return null;
        }
    }
     public static SweetAlertDialog mostrarSweetAlertDeletePassword(Context context, int tipo, String titulo, String mensaje, SweetAlertDialog.OnSweetClickListener confirmListener, SweetAlertDialog.OnSweetClickListener cancelListener) {
        if (context != null) {
            SweetAlertDialog sweetAlertDialog = new SweetAlertDialog(context, tipo);
            sweetAlertDialog.setTitleText(titulo);
            sweetAlertDialog.setContentText(mensaje);
            sweetAlertDialog.setConfirmText("Aceptar");
            sweetAlertDialog.setCancelText("Cancelar");

            sweetAlertDialog.setConfirmClickListener(sweetAlertDialog1 -> {
                sweetAlertDialog1.dismissWithAnimation();
                if (confirmListener != null) {
                    confirmListener.onClick(sweetAlertDialog1);
                }
            });

            sweetAlertDialog.setCancelClickListener(sweetAlertDialog1 -> {
                sweetAlertDialog1.dismissWithAnimation();
                if (cancelListener != null) {
                    cancelListener.onClick(sweetAlertDialog1);
                }
            });

            sweetAlertDialog.show();

            return sweetAlertDialog; // Devuelve la instancia de la alerta
        } else {
            Log.e("ShowAlertsUtility", "El contexto es nulo en mostrarSweetAlertDeletePassword");
            return null;
        }
    }

}

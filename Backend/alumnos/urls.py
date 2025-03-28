from django.urls import path
from . import views  # Importa el módulo views completo
from .views import (
    SubirCVView, HistorialCVsView, AnalizarCVView, DescargarInformePDFView,
    IniciarChatEntrevistaView, ChatEntrevistaView, RegistroView, LoginView
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path("subir-cv/", SubirCVView.as_view(), name="subir_cv"),
    path("historial-cvs/<int:alumno_id>/", HistorialCVsView.as_view(), name="historial_cvs"),
    path("analizar-cv/", AnalizarCVView.as_view(), name="analizar_cv"),
    path("descargar-informe/<int:informe_id>/", DescargarInformePDFView.as_view(), name="descargar_informe"),
    path("chat/iniciar/", IniciarChatEntrevistaView.as_view(), name="iniciar_chat_entrevista"),
    path("chat/responder/", ChatEntrevistaView.as_view(), name="responder_chat_entrevista"),

    path('registro/', RegistroView.as_view(), name='registro_alumno'),
    path('login/', LoginView.as_view(), name='login_alumno'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),


]   
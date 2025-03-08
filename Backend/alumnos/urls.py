from django.urls import path
from .views import SubirCVView, HistorialCVsView, AnalizarCVView, DescargarInformePDFView, IniciarChatEntrevistaView, ChatEntrevistaView

urlpatterns = [
    path('subir-cv/', SubirCVView.as_view(), name="subir_cv"),
    path('historial-cvs/<int:alumno_id>/', HistorialCVsView.as_view(), name="historial_cvs"),
    path('analizar-cv/', AnalizarCVView.as_view(), name="analizar_cv"),  # Nueva ruta
    path('descargar-informe/<int:informe_id>/', DescargarInformePDFView.as_view(), name="descargar_informe"),
    path('chat/iniciar/', IniciarChatEntrevistaView.as_view(), name="iniciar_chat_entrevista"),
    path('chat/responder/', ChatEntrevistaView.as_view(), name="responder_chat_entrevista"),
]


from django.urls import path
from .views import SubirCVView, HistorialCVsView

urlpatterns = [
    path('subir-cv/', SubirCVView.as_view(), name="subir_cv"),
    path('historial-cvs/<int:alumno_id>/', HistorialCVsView.as_view(), name="historial_cvs"),
]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlumnoViewSet, CVViewSet, HabilidadViewSet, InformeViewSet, EntrevistaViewSet, HistorialEntrevistasViewSet

router = DefaultRouter()
router.register(r'alumnos', AlumnoViewSet)
router.register(r'cvs', CVViewSet)
router.register(r'habilidades', HabilidadViewSet)
router.register(r'informes', InformeViewSet)
router.register(r'entrevistas', EntrevistaViewSet)
router.register(r'historial-entrevistas', HistorialEntrevistasViewSet)


urlpatterns = [
    path('', include(router.urls)),
]

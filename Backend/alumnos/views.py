from rest_framework import viewsets
from .models import Alumno, CV, Habilidad, Informe, Entrevista, HistorialEntrevistas
from .serializers import AlumnoSerializer, CVSerializer, HabilidadSerializer, InformeSerializer, EntrevistaSerializer, HistorialEntrevistasSerializer

class AlumnoViewSet(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer

class CVViewSet(viewsets.ModelViewSet):
    queryset = CV.objects.all()
    serializer_class = CVSerializer

class HabilidadViewSet(viewsets.ModelViewSet):
    queryset = Habilidad.objects.all()
    serializer_class = HabilidadSerializer

class InformeViewSet(viewsets.ModelViewSet):
    queryset = Informe.objects.all()
    serializer_class = InformeSerializer

class EntrevistaViewSet(viewsets.ModelViewSet):
    queryset = Entrevista.objects.all()
    serializer_class = EntrevistaSerializer

class HistorialEntrevistasViewSet(viewsets.ModelViewSet):
    queryset = HistorialEntrevistas.objects.all()
    serializer_class = HistorialEntrevistasSerializer


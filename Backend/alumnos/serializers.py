from rest_framework import serializers
from .models import Alumno, CV, Habilidad, Informe

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'

class CVSerializer(serializers.ModelSerializer):
    habilidades = serializers.StringRelatedField(many=True)  # Para mostrar habilidades asociadas

    class Meta:
        model = CV
        fields = '__all__'

class HabilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habilidad
        fields = '__all__'

class InformeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informe
        fields = '__all__'

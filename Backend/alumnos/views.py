import fitz  # PyMuPDF para extraer texto de PDF
import docx  # python-docx para extraer texto de Word
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import CV, Alumno
from .serializers import CVSerializer
from rest_framework.generics import ListAPIView

#subir cv

class SubirCVView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Permite la subida de archivos

    def extraer_texto_cv(self, ruta_archivo):
        """
        Extrae el texto de un archivo PDF o DOCX desde su ruta.
        """
        contenido = ""

        if ruta_archivo.endswith(".pdf"):
            with fitz.open(ruta_archivo) as pdf:
                for pagina in pdf:
                    contenido += pagina.get_text("text") + "\n"

        elif ruta_archivo.endswith(".docx"):
            doc = docx.Document(ruta_archivo)
            contenido = "\n".join([p.text for p in doc.paragraphs])

        return contenido.strip()

    def post(self, request, *args, **kwargs):
        alumno_id = request.data.get("alumno_id")

        # Validar que el alumno existe
        try:
            alumno = Alumno.objects.get(id=alumno_id)
        except Alumno.DoesNotExist:
            return Response({"error": "El alumno no existe"}, status=status.HTTP_404_NOT_FOUND)

        # Guardar el archivo
        archivo = request.FILES.get("archivo")
        if not archivo:
            return Response({"error": "Debe subir un archivo"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear y guardar el objeto CV primero
        nuevo_cv = CV.objects.create(alumno=alumno, archivo=archivo)
        
        # Obtener la ruta completa del archivo guardado
        ruta_archivo = nuevo_cv.archivo.path

        # Extraer texto del archivo después de guardarlo
        contenido_extraido = self.extraer_texto_cv(ruta_archivo)

        # Actualizar el CV con el contenido extraído
        nuevo_cv.contenido_extraido = contenido_extraido
        nuevo_cv.save()

        return Response({
            "mensaje": "CV subido y procesado correctamente",
            "cv": CVSerializer(nuevo_cv).data
        }, status=status.HTTP_201_CREATED)

#historial de los cv's

class HistorialCVsView(ListAPIView):
    serializer_class = CVSerializer

    def get_queryset(self):
        alumno_id = self.kwargs.get("alumno_id")
        return CV.objects.filter(alumno__id=alumno_id).order_by("-fecha_creacion")

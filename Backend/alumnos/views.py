import fitz  # PyMuPDF para extraer texto de PDF
import docx  # python-docx para extraer texto de Word
import openai
from django.http import HttpResponse
from django.conf import settings
from reportlab.lib.pagesizes import letter
from django.shortcuts import get_object_or_404
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit  # Para ajustar el texto automáticamente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import CV, Alumno, Informe
from .serializers import CVSerializer, InformeSerializer
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

    def validar_campos_cv(self, contenido_extraido):
        """
        Valida que el contenido del CV tenga las secciones necesarias.
        """
        campos_obligatorios = [
            "Perfil Profesional",
            "Educación Superior",
            "Experiencia Académica",
            "Experiencia Laboral",
            "Información Adicional"
        ]

        faltantes = [campo for campo in campos_obligatorios if campo.lower() not in contenido_extraido.lower()]

        if faltantes:
            return False, faltantes
        return True, []

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

        # Validar que el contenido del CV tenga las secciones necesarias
        es_valido, faltantes = self.validar_campos_cv(contenido_extraido)
        if not es_valido:
            return Response({
                "error": "El CV no contiene todas las secciones obligatorias.",
                "secciones_faltantes": faltantes
            }, status=status.HTTP_400_BAD_REQUEST)

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

#Analisis de CV con IA
class AnalizarCVView(APIView):
    """
    Analiza el contenido de un CV usando OpenAI (ChatGPT).
    """

    def post(self, request, *args, **kwargs):
        cv_id = request.data.get("cv_id")

        # Validar que el CV existe
        try:
            cv = CV.objects.get(id=cv_id)
        except CV.DoesNotExist:
            return Response({"error": "El CV no existe"}, status=status.HTTP_404_NOT_FOUND)

        # Enviar el contenido del CV a OpenAI
        prompt = f"""
        Analiza el siguiente currículum y extrae la siguiente información:
        - Habilidades técnicas y blandas
        - Experiencia laboral
        - Áreas de mejora
        - Resumen general del perfil

        CV:
        {cv.contenido_extraido}
        """

        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

            response = client.chat.completions.create(
                model="gpt-4",  # Usa "gpt-4" o "gpt-3.5-turbo" según disponibilidad
                messages=[{"role": "user", "content": prompt}]
            )

            # Extraer la respuesta de OpenAI
            analisis = response.choices[0].message.content

            # Guardar el informe en la base de datos
            informe = Informe.objects.create(cv=cv, resumen=analisis)

            return Response({
                "mensaje": "Análisis de CV completado",
                "informe": InformeSerializer(informe).data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": f"Error al conectar con OpenAI: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DescargarInformePDFView(APIView):
    def get(self, request, informe_id, *args, **kwargs):
        informe = get_object_or_404(Informe, id=informe_id)

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="Informe_{informe.id}.pdf"'

        pdf = canvas.Canvas(response, pagesize=letter)
        pdf.setTitle(f"Informe {informe.id}")

        # Configuración de márgenes
        margen_izquierdo = 50
        margen_superior = 750
        ancho_maximo = 500  # Ajusta el ancho del texto para no salirse de la hoja

        # Configurar fuente
        pdf.setFont("Helvetica", 12)

        # Dividir el texto para ajustarlo al ancho del PDF
        lineas = simpleSplit(informe.resumen, "Helvetica", 12, ancho_maximo)

        # Dibujar el texto línea por línea
        y_position = margen_superior
        for linea in lineas:
            pdf.drawString(margen_izquierdo, y_position, linea)
            y_position -= 20  # Mover hacia abajo cada línea

            # Evitar que el texto salga de la hoja
            if y_position < 50:
                pdf.showPage()
                pdf.setFont("Helvetica", 12)
                y_position = margen_superior

        pdf.showPage()
        pdf.save()

        return response

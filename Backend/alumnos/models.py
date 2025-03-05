from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Modelo de Alumno con autenticación personalizada
class AlumnoManager(BaseUserManager):
    def create_user(self, correo_electronico, nombre, contrasena=None):
        if not correo_electronico:
            raise ValueError("El usuario debe tener un correo electrónico")
        usuario = self.model(
            correo_electronico=self.normalize_email(correo_electronico),
            nombre=nombre
        )
        usuario.set_password(contrasena)
        usuario.save(using=self._db)
        return usuario

class Alumno(AbstractBaseUser):
    nombre = models.CharField(max_length=255)
    correo_electronico = models.EmailField(unique=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    objects = AlumnoManager()

    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['nombre']

# Modelo de CV
class CV(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)
    nombre_archivo = models.CharField(max_length=255, null=True, blank=True)
    formato_archivo = models.CharField(max_length=50)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

# Modelo de Habilidades (Ahora correctamente normalizado)
class Habilidad(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name="habilidades")
    habilidad = models.CharField(max_length=255)
    tipo = models.CharField(max_length=50, choices=[('Técnica', 'Técnica'), ('Blanda', 'Blanda')])
    nivel = models.CharField(max_length=50, choices=[('Básico', 'Básico'), ('Intermedio', 'Intermedio'), ('Avanzado', 'Avanzado')])

# Modelo de Informe
class Informe(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)
    resumen = models.TextField()
    fortalezas = models.TextField()
    areas_mejora = models.TextField()
    fecha_generacion = models.DateTimeField(auto_now_add=True)

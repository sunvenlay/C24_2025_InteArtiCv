# Generated by Django 5.1.7 on 2025-03-08 23:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alumno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('contrasena', models.CharField(max_length=255)),
                ('fecha_ultimo_acceso', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Habilidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('habilidad', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PreguntaEntrevista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TipoHabilidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CV',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('archivo', models.FileField(upload_to='cvs/')),
                ('contenido_extraido', models.TextField(blank=True, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cvs', to='alumnos.alumno')),
            ],
        ),
        migrations.CreateModel(
            name='Entrevista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('promedio_puntuacion', models.FloatField(blank=True, null=True)),
                ('resultado_final', models.CharField(blank=True, max_length=255, null=True)),
                ('alumno', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entrevistas', to='alumnos.alumno')),
            ],
        ),
        migrations.CreateModel(
            name='HistorialEntrevista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resultado', models.CharField(max_length=255)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('entrevista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='historial', to='alumnos.entrevista')),
            ],
        ),
        migrations.CreateModel(
            name='Informe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resumen', models.TextField()),
                ('fecha_generacion', models.DateTimeField(auto_now_add=True)),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='informes', to='alumnos.cv')),
            ],
        ),
        migrations.CreateModel(
            name='InformeAreasMejora',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area_mejora', models.CharField(max_length=255)),
                ('informe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='areas_mejora', to='alumnos.informe')),
            ],
        ),
        migrations.CreateModel(
            name='InformeFortalezas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fortaleza', models.CharField(max_length=255)),
                ('informe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fortalezas', to='alumnos.informe')),
            ],
        ),
        migrations.CreateModel(
            name='InformeHabilidades',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('habilidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='alumnos.habilidad')),
                ('informe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='habilidades', to='alumnos.informe')),
            ],
        ),
        migrations.CreateModel(
            name='RespuestaEntrevista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('respuesta', models.TextField()),
                ('retroalimentacion', models.TextField(blank=True, null=True)),
                ('puntuacion', models.IntegerField(blank=True, null=True)),
                ('entrevista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respuestas', to='alumnos.entrevista')),
                ('pregunta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respuestas', to='alumnos.preguntaentrevista')),
            ],
        ),
        migrations.AddField(
            model_name='habilidad',
            name='tipo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='habilidades', to='alumnos.tipohabilidad'),
        ),
        migrations.CreateModel(
            name='CVHabilidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cv_habilidades', to='alumnos.cv')),
                ('habilidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cv_habilidades', to='alumnos.habilidad')),
            ],
            options={
                'unique_together': {('cv', 'habilidad')},
            },
        ),
    ]

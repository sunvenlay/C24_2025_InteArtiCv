# Generated by Django 5.1.7 on 2025-03-26 01:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alumnos', '0005_alumno_usuario'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alumno',
            name='usuario',
        ),
    ]

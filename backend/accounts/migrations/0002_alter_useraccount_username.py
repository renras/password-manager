# Generated by Django 3.2.15 on 2022-08-06 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]

# Generated by Django 4.0.6 on 2022-07-30 07:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('keys', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Secret',
            new_name='Key',
        ),
    ]

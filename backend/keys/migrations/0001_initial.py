# Generated by Django 3.2.15 on 2022-08-07 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Key',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('key', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]

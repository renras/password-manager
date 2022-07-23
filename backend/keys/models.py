from django.db import models


class Secret(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    class Meta:
        ordering = ['created']

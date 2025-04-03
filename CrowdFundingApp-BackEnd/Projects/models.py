from django.db import models
from django.core.exceptions import ValidationError
from datetime import datetime
from Users.models import User
# Create your models here.


class Project(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    details = models.TextField()
    total_target = models.DecimalField(max_digits=10, decimal_places=2) 
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE,null=True)

    def CheckDate(self):
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be after start time.")

    def save(self, *args, **kwargs):
        self.CheckDate()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title}"
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
# Create your models here.
class User (models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(max_length=50,unique=True)
    password = models.CharField(max_length=128)
    mobile_phone = PhoneNumberField(region="EG", unique=True)
    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.first_name}"
    


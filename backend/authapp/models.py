from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .manager import MyUserManager

class MyUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.TextField()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyUserManager()

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self,app_label):
        return True

    def __str__(self):
        return self.username
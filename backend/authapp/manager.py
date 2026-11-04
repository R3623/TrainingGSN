from django.contrib.auth.models import BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if(not email):
            raise ValueError('Email doivent être fournis')
        if(not username):
            raise ValueError('Nom d\'utilisateur doit être fourni')
        
        user = self.model(
            email=email,
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username , password):
        user = self.create_user(
            email = email,
            username = username,
            password = password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
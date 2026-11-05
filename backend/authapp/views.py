from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import MyUser
import json
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login

# Create your views here.

@csrf_exempt
def signin(request):
    try:

        if(request.method == "POST"):
            data = json.loads(request.body)
            
                    
            email = data.get("email")
            password1 = data.get("password1")
            password2 = data.get("password2")
            username = data.get("username")

            
            # Mot de Passe non identique
            if(password1 != password2):
                return JsonResponse({
                    "message":"Mot de passe non identique",
                    "status":400
                })

            # Vérifier si l'utilisateur existe déjà
            user = MyUser.objects.filter(email=email)
            if len(user)>0:
                return JsonResponse({
                    "message":"Utilisateur déjà existant",
                    "status":400
                })

            # Créer un nouvel utilisateur
            user = MyUser.objects.create_user(email=email, password=password1, username=username)
            user.save()
            return JsonResponse({
                "message":"Utilisateur créé avec succès",
                "status":200
            })
    except Exception as e:
        return JsonResponse({
            "message":str(e),
            "status":500
        })
        
            


@csrf_exempt
def logins(request):
    try:
        if(request.method == "POST"):
            data = json.loads(request.body)

            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if(email is None):
                user = MyUser.objects.filter(username=username).first()
                
                if user :
                    email = user.email
                else:
                    return JsonResponse({
                        "message":"Nom d'utilisateur non trouvé",
                        "status":400
                    })
            
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    "message":"Connexion réussie",
                    "user" : {
                        "username": user.username,
                        "email": user.email
                    },
                    "status":200
                })
            
            return JsonResponse({
                "message":"Email ou Mot de passe incorrect",
                "status":400
            })


    except Exception as e:
        return JsonResponse({
            "message":str(e),
            "status":500
        })
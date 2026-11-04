from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import MyUser
# Create your views here.
def signin(request):
    if(request.method == "POST"):
        email = request.POST.get("email")
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        username = request.POST.get("username")
        
        if(password1 == password2):
            user = MyUser.objects.create_user(email=email,username=username,password=password1)
            user.save()

            json_message = {
                "erreur": None,
                "status": 200
            }
        
        else:
            json_message = {
                "erreur": "Passwords do not match",
                "status": 400
            }

        return JsonResponse(json_message)
    return HttpResponse("Page d'inscription , utilisez POST")
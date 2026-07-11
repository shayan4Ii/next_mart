from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse



@api_view(["POST"])
def Signup(request):
    username = request.data["username"]
    email = request.data["email"]
    password = request.data["password"]

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists"},
            status=400
        )
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "message": "Signup Successful",
            "username": user.username,
        },
        status=201
    )

@api_view(["POST"])
def Login(request):
    username = request.data["username"]
    password = request.data["password"]

    user = authenticate(
        username=username,
        password=password,
    )
    if user is not None:
        login(request, user)
        return Response({
            "success" : True,
            "message" : "Login Successful",
        }, status=200)
    
    return Response({
        "success" : False,
        "message" : "Invalid username or password",
        "username" : request.username,

    }, status=401)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Home(request):
    return Response({
        "message" : "Welcome",
        "username": request.username,
    })

@api_view(["POST"])
def Logout(request):
    logout(request)

    response = Response({
        "success": True
    })

    response.delete_cookie("sessionid")
    response.delete_cookie("csrftoken")

    return response


@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"success": True})



from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import update_session_auth_hash



@api_view(["POST"])
def Signup(request):

    username = request.data["signupusername"]
    email = request.data["email"]
    password = request.data["signuppassword"]

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

from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
            "success": True,
            "message": "Login Successful",
            "username": request.user.username,
            "email" : request.user.email,
        }, status=200)

    else:
        return Response({
            "success": False,
            "message": "Invalid username or password",
        }, status=401)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Home(request):
    return Response({
        "message" : "Welcome",
        "username": request.user.username,
        "email": request.user.email,
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def changepass(request):
    oldpassword = request.data['oldpassword']
    newpassword = request.data['newpassword']
    user = request.user

    if not user.check_password(oldpassword):
        return Response({
            "success" : False,
            "message" : "Invalid password",
        }, status=400)
    

    user.set_password(newpassword)
    user.save()

    update_session_auth_hash(request, user)

    return Response({
        "success" : True,
        "message" : "password changed successfully!",
    }, status=200)

from django.contrib.auth.models import User, authenticate, login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



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
            "message" : "Login Successful"
            "username" : user.username,
        }, status=200)
    
    return Response({
        "message" : "Invalid username or password",

    }, status=401)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Home(request):
    return Response({
        "message" : "Welcome",
        "username": request.user.username,
    })

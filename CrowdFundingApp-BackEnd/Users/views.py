from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth import  login ,logout
from rest_framework.authtoken.models import Token
from .serializers import userSerializer
@api_view(['POST'])
def login_api(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        loguser = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(password, loguser.password):
        return Response({"message": "Login successful", "user": {"email": loguser.email, "name": loguser.first_name},"loguser":loguser.id}, status=status.HTTP_200_OK)
    
    if loguser is not None:
        login(request, loguser)
        return Response({
            "message": "Login successfulsss",
            "user": {
                "email": loguser.email,
                "first_name": loguser.first_name,
            },
            
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getuser(request,code):
    loguser = User.objects.get(id=code)
    serializer = userSerializer(loguser)
    return Response(serializer.data)

    
@api_view(['POST'])
def register_api(request):
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    email = request.data.get("email")
    password = request.data.get("password")
    mobile_phone = request.data.get("mobile_phone")

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(mobile_phone=mobile_phone).exists():
        return Response({"error": "Phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)


    try:
        user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        mobile_phone=mobile_phone
        )
        user.save()

        return Response({
            "message": "Registration successful",
            "user": {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "mobile_phone": str(user.mobile_phone),
            }
        }, status=status.HTTP_201_CREATED)

    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_api(request):
    logout(request) 
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
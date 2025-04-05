from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from datetime import datetime, timedelta
from Users.models import User
# Create your views here.


@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True) 
    return Response(serializer.data)

@api_view(['GET'])
def get_project(request,code):
    project = Project.objects.get(id=code)
    serializer = ProjectSerializer(project) 
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_projects(request):
    projects = Project.objects.filter(owner=request.user)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_project(request):
    title = request.data.get("title")
    details = request.data.get("details")
    total_target = request.data.get("total_target")
    start_time = request.data.get("start_time")
    end_time = request.data.get("end_time")
    userId = request.data.get("userID")
    try:
        userdd = User.objects.get(id=userId)
        project = Project(
            title=title,
            details=details,
            total_target=total_target,
            start_time=start_time,
            end_time=end_time,
            owner=userdd
        )
        project.save()

        return Response({
            "message": "Project created successfully",
            "project": ProjectSerializer(project).data
        }, status=status.HTTP_201_CREATED)

    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def update_project(request, code):
    userId = request.data.get("UserID")
    userdd = User.objects.get(id=userId)    
    try:
        project = Project.objects.get(id=code)
        if project.owner != userdd:
            return Response({"error": "You can only edit your own projects."}, status=status.HTTP_403_FORBIDDEN)

        project.title = request.data.get("title", project.title)
        project.details = request.data.get("details", project.details)
        project.total_target = request.data.get("total_target", project.total_target)
        project.start_time = request.data.get("start_time", project.start_time)
        project.end_time = request.data.get("end_time", project.end_time)


        project.save()

        return Response({
            "message": "Project updated successfully",
            "project": ProjectSerializer(project).data
        }, status=status.HTTP_200_OK)

    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def delete_project(request, code):
    userId = request.data.get("UserID")
    userdd = User.objects.get(id=userId)
    try:
        project = Project.objects.get(id=code)

        if project.owner != userdd:
            return Response({"error": "You can only delete your own projects."}, status=status.HTTP_403_FORBIDDEN)

        project.delete()
        return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def search_projects_by_date(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if not start_date or not end_date:
        return Response({"error": "Please provide both start_date and end_date in the query parameters."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d") 
        end_date = datetime.strptime(end_date, "%Y-%m-%d") + timedelta(days=1) - timedelta(seconds=1)
        projects = Project.objects.filter(start_time__gte=start_date, end_time__lte=end_date)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    except ValueError:
        return Response({"error": "Invalid date format. Please use ISO format (YYYY-MM-DDTHH:MM:SS)."}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
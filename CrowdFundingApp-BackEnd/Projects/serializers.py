from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'owner', 'title', 'details', 'total_target', 'start_time', 'end_time']
        read_only_fields = ['id', 'owner']

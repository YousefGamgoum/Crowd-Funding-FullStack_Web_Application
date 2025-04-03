
from django.contrib import admin
from django.urls import path
from Users.views import login_api , register_api,logout_api
from Projects.views import get_projects ,create_project,delete_project,update_project,search_projects_by_date,get_project
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', login_api, name='login_api'),
    path('api/register/', register_api, name='register_api'),
    path('api/logout_api/', logout_api, name='logout_api'),
    
    path('api/projects/', get_projects, name='get_projects'),
    path('api/projects/create/', create_project, name='create_project'),
    path('api/projects/<int:code>/', get_project, name='get_project'),
    path('api/projects/update/<int:code>/', update_project, name='edit_project'),
    path('api/projects/delete/<int:code>/', delete_project, name='delete_project'),
    path('api/projects/search/', search_projects_by_date, name='search_projects_by_date'),
]


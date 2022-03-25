from django.urls import path
from django.conf.urls import include, url
from . import views


# Identity URLS
urlpatterns = [
    # cycle url
    path('v1/', views.BikeView.as_view({
        'get': 'list',
    })),
    path('v1/searchConnection', views.BikeView.as_view({
        'post': 'create'
    })),
    path('v1/<str:pk>', views.BikeView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('v1/book/', views.BookView.as_view({
        'post': 'create'
    })),



]
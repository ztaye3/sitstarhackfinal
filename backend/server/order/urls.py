from django.conf.urls import url
from django.urls import path
from . import views
urlpatterns = [
    url(r'^v1/test-payment/$', views.test_payment),
    path('v1/', views.OrderView.as_view({
        'get': 'list',
    })),
    path('v1/addOrder/', views.OrderView.as_view({
        'post': 'create'
    })),
    path('v1/<str:pk>/', views.OrderView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
]
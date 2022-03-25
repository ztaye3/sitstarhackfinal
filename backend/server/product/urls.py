from django.urls import path
from django.conf.urls import include, url
from . import views


# Product URLS
urlpatterns = [
    path('v1/', views.ProductView.as_view({
        'get': 'list',
    })),
    path('v1/addProduct/', views.ProductView.as_view({
        'post': 'create'
    })),
    path('v1/<str:pk>/', views.ProductView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    path('v1/type/getAll/', views.ProductTypeView.as_view({
        'get': 'list',
    })),
    path('v1/type/addProductType/', views.ProductTypeView.as_view({
        'post': 'create'
    })),
    path('v1/type/<str:pk>/', views.ProductTypeView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    path('v1/unit/getAll/', views.ProductUnitView.as_view({
        'get': 'list',
    })),
    path('v1/unit/addProductUnit/', views.ProductUnitView.as_view({
        'post': 'create'
    })),
    path('v1/unit/<str:pk>/', views.ProductUnitView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    path('v1/name/getAll/', views.ProductNameView.as_view({
        'get': 'list',
    })),
    path('v1/name/addProductName/', views.ProductNameView.as_view({
        'post': 'create'
    })),
    path('v1/name/<str:pk>/', views.ProductNameView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    path('v1/slider/getAll/', views.ImageSliderView.as_view({
        'get': 'list',
    })),
    path('v1/slider/addImageSlider/', views.ImageSliderView.as_view({
        'post': 'create'
    })),
    path('v1/slider/<str:pk>/', views.ImageSliderView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),

    path('v1/searchProduct', views.SearchProductByName.as_view()),
    path('v1/searchCategory', views.SearchProductByCategory.as_view()),
    path('v1/searchByRate/', views.SearchProductByRate.as_view()),
    path('v1/updateRate', views.UpdateProductRate.as_view()),

]

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('identity.urls')),
    path('api/bike/', include('bike.urls'))

]
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)

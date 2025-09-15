from django.contrib import admin
from .models import DojoLocation, Gallery, Instructor, KarateAdventure


@admin.register(DojoLocation)
class DojoLocationAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "country")
    search_fields = ("name", "city", "country")


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("title", "uploaded_at")
    search_fields = ("title",)


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ("name", "rank", "dojo_location")
    search_fields = ("name", "rank")
    list_filter = ("dojo_location",)


@admin.register(KarateAdventure)
class KarateAdventureAdmin(admin.ModelAdmin):
    list_display = ("title", "start_date", "end_date", "location")
    search_fields = ("title", "location")



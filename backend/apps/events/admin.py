from django.contrib import admin
from .models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'fee', 'current_registrations', 'max_participants', 'is_published')
    list_filter = ('is_published', 'date', 'location')
    search_fields = ('title', 'description', 'location')
    ordering = ('-date',)
    readonly_fields = ('created_at', 'updated_at', 'current_registrations')


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'event')
    search_fields = ('user__email', 'user__username', 'event__title')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

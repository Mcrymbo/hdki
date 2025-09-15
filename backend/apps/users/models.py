from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone
import uuid


class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)  # Override to make email verification required
    email_verification_token = models.UUIDField(default=uuid.uuid4, unique=True)
    password_reset_token = models.UUIDField(null=True, blank=True, unique=True)
    password_reset_expires = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def generate_password_reset_token(self):
        """Generate a new password reset token"""
        self.password_reset_token = uuid.uuid4()
        self.password_reset_expires = timezone.now() + timezone.timedelta(hours=24)
        self.save()
        return self.password_reset_token

    def is_password_reset_token_valid(self, token):
        """Check if password reset token is valid"""
        return (
            self.password_reset_token == token and
            self.password_reset_expires and
            timezone.now() < self.password_reset_expires
        )

    def clear_password_reset_token(self):
        """Clear password reset token"""
        self.password_reset_token = None
        self.password_reset_expires = None
        self.save()


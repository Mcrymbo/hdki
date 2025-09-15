"""
Custom JWT authentication for GraphQL
"""
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from datetime import datetime

User = get_user_model()


class JWTAuthenticationBackend(BaseBackend):
    """
    Custom JWT authentication backend for GraphQL
    """
    
    def authenticate(self, request, token=None, **kwargs):
        if not token:
            return None
            
        try:
            # Decode JWT token
            payload = jwt.decode(
                token, 
                settings.SECRET_KEY, 
                algorithms=[settings.JWT_AUTH['JWT_ALGORITHM']]
            )
            
            # Check if token is expired
            if 'exp' in payload:
                exp = datetime.fromtimestamp(payload['exp'])
                if exp < datetime.utcnow():
                    return None
            
            # Get user
            user_id = payload.get('user_id')
            if user_id:
                try:
                    user = User.objects.get(id=user_id)
                    return user
                except User.DoesNotExist:
                    return None
                    
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        except Exception:
            return None
            
        return None
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None



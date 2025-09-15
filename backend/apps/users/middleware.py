"""
Custom GraphQL middleware for JWT authentication
"""
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from datetime import datetime

User = get_user_model()


class JWTMiddleware:
    """
    Custom JWT middleware for GraphQL
    """
    
    def resolve(self, next, root, info, **args):
        # Get the Authorization header
        request = info.context
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if auth_header.startswith('JWT '):
            token = auth_header[4:]  # Remove 'JWT ' prefix
            
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
                        request.user = AnonymousUser()
                        return next(root, info, **args)
                
                # Get user
                user_id = payload.get('user_id')
                if user_id:
                    try:
                        user = User.objects.get(id=user_id)
                        request.user = user
                    except User.DoesNotExist:
                        request.user = AnonymousUser()
                else:
                    request.user = AnonymousUser()
                    
            except jwt.ExpiredSignatureError:
                request.user = AnonymousUser()
            except jwt.InvalidTokenError:
                request.user = AnonymousUser()
            except Exception:
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()
        
        return next(root, info, **args)



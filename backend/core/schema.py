import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from apps.news.models import News
from apps.events.models import Event, EventRegistration
from apps.contact.models import ContactMessage
from apps.content.models import DojoLocation as DojoLocationModel, Gallery as GalleryModel, Instructor as InstructorModel, KarateAdventure as KarateAdventureModel
import graphql_jwt
import uuid

User = get_user_model()


# Object Types
class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'is_admin', 'date_joined')


class NewsType(DjangoObjectType):
    cover_image = graphene.String()
    class Meta:
        model = News
        fields = ('id', 'title', 'content', 'cover_image', 'author', 'published_at', 'updated_at', 'is_published')

    def resolve_cover_image(self, info):
        if self.cover_image:
            request = info.context
            return request.build_absolute_uri(self.cover_image.url)
        return None

class EventType(DjangoObjectType):
    cover_image = graphene.String()
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'date', 'location', 'cover_image', 'fee', 'max_participants', 
                 'current_registrations', 'created_at', 'updated_at', 'is_published')

    def resolve_cover_image(self, info):
        if self.cover_image:
            request = info.context
            return request.build_absolute_uri(self.cover_image.url)
        return None

class EventRegistrationType(DjangoObjectType):
    class Meta:
        model = EventRegistration
        fields = ('id', 'event', 'user', 'status', 'additional_notes', 'created_at', 'updated_at')


class ContactMessageType(DjangoObjectType):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'message', 'created_at', 'is_read')


# New Content Types
class DojoLocationType(DjangoObjectType):
    cover_image = graphene.String()
    instructors = graphene.List(lambda: InstructorType)
    class Meta:
        model = DojoLocationModel
        fields = ('id', 'name', 'address', 'city', 'country', 'map_link', 'description', 'cover_image')

    def resolve_cover_image(self, info):
        if self.cover_image:
            request = info.context
            return request.build_absolute_uri(self.cover_image.url)
        return None

    def resolve_instructors(self, info):
        return self.instructors.all()


class GalleryType(DjangoObjectType):
    image = graphene.String()
    class Meta:
        model = GalleryModel
        fields = ('id', 'title', 'image', 'description', 'uploaded_at')

    def resolve_image(self, info):
        if self.image:
            request = info.context
            return request.build_absolute_uri(self.image.url)
        return None


class InstructorType(DjangoObjectType):
    photo = graphene.String()
    class Meta:
        model = InstructorModel
        fields = ('id', 'name', 'rank', 'bio', 'photo', 'dojo_location')

    def resolve_photo(self, info):
        if self.photo:
            request = info.context
            return request.build_absolute_uri(self.photo.url)
        return None


class KarateAdventureType(DjangoObjectType):
    cover_image = graphene.String()
    class Meta:
        model = KarateAdventureModel
        fields = ('id', 'title', 'description', 'start_date', 'end_date', 'location', 'cover_image')

    def resolve_cover_image(self, info):
        if self.cover_image:
            request = info.context
            return request.build_absolute_uri(self.cover_image.url)
        return None

# Queries
class Query(graphene.ObjectType):
    # User queries
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.ID(required=True))

    # News queries
    news = graphene.List(NewsType)
    news_article = graphene.Field(NewsType, id=graphene.ID(required=True))

    # Event queries
    events = graphene.List(EventType)
    event = graphene.Field(EventType, id=graphene.ID(required=True))
    my_registrations = graphene.List(EventRegistrationType)

    # Contact queries
    contact_messages = graphene.List(ContactMessageType)

    # Content queries (public)
    dojo_locations = graphene.List(DojoLocationType)
    dojo_location = graphene.Field(DojoLocationType, id=graphene.ID(required=True))
    gallery_items = graphene.List(GalleryType)
    instructors = graphene.List(InstructorType)
    instructor = graphene.Field(InstructorType, id=graphene.ID(required=True))
    karate_adventures = graphene.List(KarateAdventureType)
    karate_adventure = graphene.Field(KarateAdventureType, id=graphene.ID(required=True))

    def resolve_me(self, info):
        user = info.context.user
        if user.is_authenticated:
            return user
        return None

    def resolve_users(self, info):
        user = info.context.user
        if user.is_authenticated and user.is_admin:
            return User.objects.all()
        return None

    def resolve_user(self, info, id):
        user = info.context.user
        if user.is_authenticated and user.is_admin:
            return User.objects.get(id=id)
        return None

    def resolve_news(self, info):
        return News.objects.filter(is_published=True).order_by('-published_at')

    def resolve_news_article(self, info, id):
        return News.objects.get(id=id, is_published=True)

    def resolve_events(self, info):
        return Event.objects.filter(is_published=True).order_by('-date')

    def resolve_event(self, info, id):
        return Event.objects.get(id=id, is_published=True)

    def resolve_my_registrations(self, info):
        user = info.context.user
        if user.is_authenticated:
            return EventRegistration.objects.filter(user=user)
        return None

    def resolve_contact_messages(self, info):
        user = info.context.user
        if user.is_authenticated and user.is_admin:
            return ContactMessage.objects.all()
        return None

    # Content resolvers
    def resolve_dojo_locations(self, info):
        return DojoLocationModel.objects.all()

    def resolve_dojo_location(self, info, id):
        return DojoLocationModel.objects.get(id=id)

    def resolve_gallery_items(self, info):
        return GalleryModel.objects.order_by('-uploaded_at')

    def resolve_instructors(self, info):
        return InstructorModel.objects.select_related('dojo_location').all()

    def resolve_instructor(self, info, id):
        return InstructorModel.objects.get(id=id)

    def resolve_karate_adventures(self, info):
        return KarateAdventureModel.objects.order_by('-start_date')

    def resolve_karate_adventure(self, info, id):
        return KarateAdventureModel.objects.get(id=id)


# Authentication Response Types
class AuthPayload(graphene.ObjectType):
    token = graphene.String()
    refresh_token = graphene.String()
    user = graphene.Field(UserType)

class AuthResponse(graphene.ObjectType):
    success = graphene.Boolean()
    message = graphene.String()
    payload = graphene.Field(AuthPayload)

# Authentication Mutations
class RegisterUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()

    success = graphene.Boolean()
    message = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, username, email, password, first_name=None, last_name=None, phone=None):
        try:
            # Check if user already exists
            if User.objects.filter(email=email).exists():
                return RegisterUser(success=False, message="User with this email already exists")
            
            if User.objects.filter(username=username).exists():
                return RegisterUser(success=False, message="User with this username already exists")

            # Validate password
            try:
                validate_password(password)
            except ValidationError as e:
                return RegisterUser(success=False, message=f"Password validation failed: {', '.join(e.messages)}")

            # Create user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name or '',
                last_name=last_name or '',
                phone=phone or '',
                is_active=False  # Require email verification
            )

            # Send verification email (in production, you'd implement this)
            # For now, we'll just return success
            return RegisterUser(
                success=True, 
                message="User registered successfully. Please check your email to verify your account.",
                user=user
            )
        except Exception as e:
            return RegisterUser(success=False, message=str(e))

class LoginUser(graphene.Mutation):
    class Arguments:
        username_or_email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    payload = graphene.Field(AuthPayload)

    def mutate(self, info, username_or_email, password):
        try:
            # Try to find user by email or username
            try:
                user = User.objects.get(email=username_or_email)
            except User.DoesNotExist:
                try:
                    user = User.objects.get(username=username_or_email)
                except User.DoesNotExist:
                    return LoginUser(success=False, message="Invalid credentials")

            # Check if user is active
            if not user.is_active:
                return LoginUser(success=False, message="Account not activated. Please check your email for activation link.")

            # Authenticate user using the model's USERNAME_FIELD (email)
            user = authenticate(username=user.email, password=password)
            if not user:
                return LoginUser(success=False, message="Invalid credentials")

            # Generate JWT tokens using the proper JWT settings
            from django.conf import settings
            import jwt
            from datetime import datetime, timedelta
            
            # Create JWT payload
            payload = {
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
                'is_admin': user.is_admin,
                'date_joined': user.date_joined.isoformat() if user.date_joined else None,
                'exp': datetime.utcnow() + settings.JWT_AUTH['JWT_EXPIRATION_DELTA'],
                'iat': datetime.utcnow(),
            }
            
            # Create refresh token payload
            refresh_payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.utcnow() + settings.JWT_AUTH['JWT_REFRESH_EXPIRATION_DELTA'],
                'iat': datetime.utcnow(),
            }
            
            # Encode tokens
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_AUTH['JWT_ALGORITHM'])
            refresh_token = jwt.encode(refresh_payload, settings.SECRET_KEY, algorithm=settings.JWT_AUTH['JWT_ALGORITHM'])

            return LoginUser(
                success=True,
                message="Login successful",
                payload=AuthPayload(token=token, refresh_token=refresh_token, user=user)
            )
        except Exception as e:
            return LoginUser(success=False, message=str(e))

class ActivateUser(graphene.Mutation):
    class Arguments:
        token = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, token):
        try:
            user = User.objects.get(email_verification_token=token)
            user.is_active = True
            user.save()
            return ActivateUser(success=True, message="Account activated successfully", user=user)
        except User.DoesNotExist:
            return ActivateUser(success=False, message="Invalid activation token")
        except Exception as e:
            return ActivateUser(success=False, message=str(e))

class RequestPasswordReset(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, email):
        try:
            user = User.objects.get(email=email)
            token = user.generate_password_reset_token()
            
            # In production, send email with reset link
            # For now, we'll just return success
            return RequestPasswordReset(
                success=True, 
                message="Password reset email sent. Please check your email."
            )
        except User.DoesNotExist:
            return RequestPasswordReset(success=False, message="User with this email does not exist")
        except Exception as e:
            return RequestPasswordReset(success=False, message=str(e))

class ResetPassword(graphene.Mutation):
    class Arguments:
        token = graphene.String(required=True)
        new_password = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, token, new_password):
        try:
            user = User.objects.get(password_reset_token=token)
            
            if not user.is_password_reset_token_valid(token):
                return ResetPassword(success=False, message="Invalid or expired reset token")

            # Validate new password
            try:
                validate_password(new_password)
            except ValidationError as e:
                return ResetPassword(success=False, message=f"Password validation failed: {', '.join(e.messages)}")

            # Set new password
            user.set_password(new_password)
            user.clear_password_reset_token()
            user.save()

            return ResetPassword(success=True, message="Password reset successfully")
        except User.DoesNotExist:
            return ResetPassword(success=False, message="Invalid reset token")
        except Exception as e:
            return ResetPassword(success=False, message=str(e))

class ChangePassword(graphene.Mutation):
    class Arguments:
        old_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, old_password, new_password):
        user = info.context.user
        if not user.is_authenticated:
            return ChangePassword(success=False, message="Authentication required")

        try:
            # Verify old password
            if not user.check_password(old_password):
                return ChangePassword(success=False, message="Current password is incorrect")

            # Validate new password
            try:
                validate_password(new_password)
            except ValidationError as e:
                return ChangePassword(success=False, message=f"Password validation failed: {', '.join(e.messages)}")

            # Set new password
            user.set_password(new_password)
            user.save()

            return ChangePassword(success=True, message="Password changed successfully")
        except Exception as e:
            return ChangePassword(success=False, message=str(e))

class UpdateProfile(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()

    success = graphene.Boolean()
    message = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, first_name=None, last_name=None, phone=None):
        user = info.context.user
        if not user.is_authenticated:
            return UpdateProfile(success=False, message="Authentication required")

        try:
            if first_name is not None:
                user.first_name = first_name
            if last_name is not None:
                user.last_name = last_name
            if phone is not None:
                user.phone = phone
            
            user.save()
            return UpdateProfile(success=True, message="Profile updated successfully", user=user)
        except Exception as e:
            return UpdateProfile(success=False, message=str(e))

# Admin-only user management mutations
class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()
        password = graphene.String(required=True)
        is_admin = graphene.Boolean()

    user = graphene.Field(UserType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, username, email, password, first_name=None, last_name=None, phone=None, is_admin=False):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return CreateUser(success=False, message="Only admins can create users")

        try:
            new_user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name or '',
                last_name=last_name or '',
                phone=phone or '',
                is_admin=is_admin,
                is_active=True  # Admin-created users are active by default
            )
            return CreateUser(user=new_user, success=True, message="User created successfully")
        except Exception as e:
            return CreateUser(success=False, message=str(e))


class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()
        is_admin = graphene.Boolean()

    user = graphene.Field(UserType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return UpdateUser(success=False, message="Only admins can update users")

        try:
            target_user = User.objects.get(id=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(target_user, field, value)
            target_user.save()
            return UpdateUser(user=target_user, success=True, message="User updated successfully")
        except User.DoesNotExist:
            return UpdateUser(success=False, message="User not found")
        except Exception as e:
            return UpdateUser(success=False, message=str(e))


class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return DeleteUser(success=False, message="Only admins can delete users")

        try:
            target_user = User.objects.get(id=id)
            target_user.delete()
            return DeleteUser(success=True, message="User deleted successfully")
        except User.DoesNotExist:
            return DeleteUser(success=False, message="User not found")
        except Exception as e:
            return DeleteUser(success=False, message=str(e))


class CreateNews(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        cover_image = graphene.String()

    news = graphene.Field(NewsType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, title, content, cover_image=None):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return CreateNews(success=False, message="Only admins can create news")

        try:
            news = News.objects.create(
                title=title,
                content=content,
                author=user,
                cover_image=cover_image
            )
            return CreateNews(news=news, success=True, message="News created successfully")
        except Exception as e:
            return CreateNews(success=False, message=str(e))


class UpdateNews(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        content = graphene.String()
        cover_image = graphene.String()
        is_published = graphene.Boolean()

    news = graphene.Field(NewsType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return UpdateNews(success=False, message="Only admins can update news")

        try:
            news = News.objects.get(id=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(news, field, value)
            news.save()
            return UpdateNews(news=news, success=True, message="News updated successfully")
        except News.DoesNotExist:
            return UpdateNews(success=False, message="News not found")
        except Exception as e:
            return UpdateNews(success=False, message=str(e))


class DeleteNews(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return DeleteNews(success=False, message="Only admins can delete news")

        try:
            news = News.objects.get(id=id)
            news.delete()
            return DeleteNews(success=True, message="News deleted successfully")
        except News.DoesNotExist:
            return DeleteNews(success=False, message="News not found")
        except Exception as e:
            return DeleteNews(success=False, message=str(e))


class CreateEvent(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        date = graphene.DateTime(required=True)
        location = graphene.String(required=True)
        cover_image = graphene.String()
        fee = graphene.Decimal()
        max_participants = graphene.Int()

    event = graphene.Field(EventType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, title, description, date, location, cover_image=None, fee=0, max_participants=None):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return CreateEvent(success=False, message="Only admins can create events")

        try:
            event = Event.objects.create(
                title=title,
                description=description,
                date=date,
                location=location,
                cover_image=cover_image,
                fee=fee,
                max_participants=max_participants
            )
            return CreateEvent(event=event, success=True, message="Event created successfully")
        except Exception as e:
            return CreateEvent(success=False, message=str(e))


class UpdateEvent(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        date = graphene.DateTime()
        location = graphene.String()
        cover_image = graphene.String()
        fee = graphene.Decimal()
        max_participants = graphene.Int()
        is_published = graphene.Boolean()

    event = graphene.Field(EventType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return UpdateEvent(success=False, message="Only admins can update events")

        try:
            event = Event.objects.get(id=id)
            for field, value in kwargs.items():
                if value is not None:
                    setattr(event, field, value)
            event.save()
            return UpdateEvent(event=event, success=True, message="Event updated successfully")
        except Event.DoesNotExist:
            return UpdateEvent(success=False, message="Event not found")
        except Exception as e:
            return UpdateEvent(success=False, message=str(e))


class DeleteEvent(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            return DeleteEvent(success=False, message="Only admins can delete events")

        try:
            event = Event.objects.get(id=id)
            event.delete()
            return DeleteEvent(success=True, message="Event deleted successfully")
        except Event.DoesNotExist:
            return DeleteEvent(success=False, message="Event not found")
        except Exception as e:
            return DeleteEvent(success=False, message=str(e))


class RegisterForEvent(graphene.Mutation):
    class Arguments:
        event_id = graphene.ID(required=True)
        additional_notes = graphene.String()

    registration = graphene.Field(EventRegistrationType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, event_id, additional_notes=None):
        user = info.context.user
        if not user.is_authenticated:
            return RegisterForEvent(success=False, message="Authentication required")

        try:
            event = Event.objects.get(id=event_id)
            
            # Check if already registered
            if EventRegistration.objects.filter(event=event, user=user).exists():
                return RegisterForEvent(success=False, message="Already registered for this event")
            
            # Check if event is full
            if event.max_participants and event.current_registrations >= event.max_participants:
                return RegisterForEvent(success=False, message="Event is full")

            registration = EventRegistration.objects.create(
                event=event,
                user=user,
                additional_notes=additional_notes or ''
            )
            
            # Update current registrations count
            event.current_registrations += 1
            event.save()

            return RegisterForEvent(registration=registration, success=True, message="Successfully registered for event")
        except Event.DoesNotExist:
            return RegisterForEvent(success=False, message="Event not found")
        except Exception as e:
            return RegisterForEvent(success=False, message=str(e))


class CreateContactMessage(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        message = graphene.String(required=True)

    contact_message = graphene.Field(ContactMessageType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, name, email, message):
        try:
            contact_message = ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            return CreateContactMessage(contact_message=contact_message, success=True, message="Message sent successfully")
        except Exception as e:
            return CreateContactMessage(success=False, message=str(e))


class CreateDojoLocation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        address = graphene.String(required=True)
        city = graphene.String(required=True)
        country = graphene.String(required=True)
        map_link = graphene.String()
        description = graphene.String()
        cover_image = graphene.String()

    dojo_location = graphene.Field(DojoLocationType)

    def mutate(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can create dojo locations")
        obj = DojoLocationModel.objects.create(**{k: v for k, v in kwargs.items() if v is not None})
        return CreateDojoLocation(dojo_location=obj)


class UpdateDojoLocation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        address = graphene.String()
        city = graphene.String()
        country = graphene.String()
        map_link = graphene.String()
        description = graphene.String()
        cover_image = graphene.String()

    dojo_location = graphene.Field(DojoLocationType)

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can update dojo locations")
        obj = DojoLocationModel.objects.get(id=id)
        for k, v in kwargs.items():
            if v is not None:
                setattr(obj, k, v)
        obj.save()
        return UpdateDojoLocation(dojo_location=obj)


class DeleteDojoLocation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can delete dojo locations")
        DojoLocationModel.objects.filter(id=id).delete()
        return DeleteDojoLocation(ok=True)


class CreateGalleryItem(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        image = graphene.String(required=True)
        description = graphene.String()

    gallery = graphene.Field(GalleryType)

    def mutate(self, info, title, image, description=None):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can create gallery items")
        obj = GalleryModel.objects.create(title=title, image=image, description=description or "")
        return CreateGalleryItem(gallery=obj)


class DeleteGalleryItem(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can delete gallery items")
        GalleryModel.objects.filter(id=id).delete()
        return DeleteGalleryItem(ok=True)


class CreateInstructor(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        rank = graphene.String(required=True)
        bio = graphene.String()
        photo = graphene.String()
        dojo_location_id = graphene.ID(required=True)

    instructor = graphene.Field(InstructorType)

    def mutate(self, info, name, rank, dojo_location_id, bio=None, photo=None):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can create instructors")
        dojo = DojoLocationModel.objects.get(id=dojo_location_id)
        obj = InstructorModel.objects.create(name=name, rank=rank, bio=bio or "", photo=photo, dojo_location=dojo)
        return CreateInstructor(instructor=obj)


class UpdateInstructor(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        rank = graphene.String()
        bio = graphene.String()
        photo = graphene.String()
        dojo_location_id = graphene.ID()

    instructor = graphene.Field(InstructorType)

    def mutate(self, info, id, dojo_location_id=None, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can update instructors")
        obj = InstructorModel.objects.get(id=id)
        if dojo_location_id is not None:
            obj.dojo_location = DojoLocationModel.objects.get(id=dojo_location_id)
        for k, v in kwargs.items():
            if k in ["name", "rank", "bio", "photo"] and v is not None:
                setattr(obj, k, v)
        obj.save()
        return UpdateInstructor(instructor=obj)


class DeleteInstructor(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can delete instructors")
        InstructorModel.objects.filter(id=id).delete()
        return DeleteInstructor(ok=True)


class CreateKarateAdventure(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        start_date = graphene.DateTime(required=True)
        end_date = graphene.DateTime(required=True)
        location = graphene.String(required=True)
        cover_image = graphene.String()

    adventure = graphene.Field(KarateAdventureType)

    def mutate(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can create adventures")
        obj = KarateAdventureModel.objects.create(**kwargs)
        return CreateKarateAdventure(adventure=obj)


class UpdateKarateAdventure(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        start_date = graphene.DateTime()
        end_date = graphene.DateTime()
        location = graphene.String()
        cover_image = graphene.String()

    adventure = graphene.Field(KarateAdventureType)

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can update adventures")
        obj = KarateAdventureModel.objects.get(id=id)
        for k, v in kwargs.items():
            if v is not None:
                setattr(obj, k, v)
        obj.save()
        return UpdateKarateAdventure(adventure=obj)


class DeleteKarateAdventure(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated or not user.is_admin:
            raise Exception("Only admins can delete adventures")
        KarateAdventureModel.objects.filter(id=id).delete()
        return DeleteKarateAdventure(ok=True)

class Mutation(graphene.ObjectType):
    # Authentication mutations
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    activate_user = ActivateUser.Field()
    request_password_reset = RequestPasswordReset.Field()
    reset_password = ResetPassword.Field()
    change_password = ChangePassword.Field()
    update_profile = UpdateProfile.Field()
    
    # JWT token mutations
    refresh_token = graphql_jwt.Refresh.Field()
    verify_token = graphql_jwt.Verify.Field()

    # Admin user management mutations
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()

    # News mutations
    create_news = CreateNews.Field()
    update_news = UpdateNews.Field()
    delete_news = DeleteNews.Field()

    # Event mutations
    create_event = CreateEvent.Field()
    update_event = UpdateEvent.Field()
    delete_event = DeleteEvent.Field()
    register_for_event = RegisterForEvent.Field()

    # Contact mutations
    create_contact_message = CreateContactMessage.Field()

    # Content mutations (admin only)
    create_dojo_location = CreateDojoLocation.Field()
    update_dojo_location = UpdateDojoLocation.Field()
    delete_dojo_location = DeleteDojoLocation.Field()
    create_gallery_item = CreateGalleryItem.Field()
    delete_gallery_item = DeleteGalleryItem.Field()
    create_instructor = CreateInstructor.Field()
    update_instructor = UpdateInstructor.Field()
    delete_instructor = DeleteInstructor.Field()
    create_karate_adventure = CreateKarateAdventure.Field()
    update_karate_adventure = UpdateKarateAdventure.Field()
    delete_karate_adventure = DeleteKarateAdventure.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)


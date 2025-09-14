import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from apps.news.models import News
from apps.events.models import Event, EventRegistration
from apps.contact.models import ContactMessage
import graphql_jwt

User = get_user_model()


# Object Types
class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'is_admin', 'date_joined')


class NewsType(DjangoObjectType):
    class Meta:
        model = News
        fields = ('id', 'title', 'content', 'cover_image', 'author', 'published_at', 'updated_at', 'is_published')


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'date', 'location', 'cover_image', 'fee', 'max_participants', 
                 'current_registrations', 'created_at', 'updated_at', 'is_published')


class EventRegistrationType(DjangoObjectType):
    class Meta:
        model = EventRegistration
        fields = ('id', 'event', 'user', 'status', 'additional_notes', 'created_at', 'updated_at')


class ContactMessageType(DjangoObjectType):
    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'email', 'message', 'created_at', 'is_read')


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


# Mutations
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
                is_admin=is_admin
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


class Mutation(graphene.ObjectType):
    # Authentication
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    verify_token = graphql_jwt.Verify.Field()

    # User mutations
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


schema = graphene.Schema(query=Query, mutation=Mutation)

import { gql } from '@apollo/client';

// Authentication mutations
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $first_name: String
    $last_name: String
    $phone: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
      phone: $phone
    ) {
      success
      message
      user {
        id
        username
        email
        first_name
        last_name
        phone
        is_admin
        date_joined
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      success
      message
      payload {
        token
        refreshToken
        user {
          id
          username
          email
          firstName
          lastName
          phone
          isAdmin
          dateJoined
        }
      }
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation ActivateUser($token: String!) {
    activateUser(token: $token) {
      success
      message
      user {
        id
        username
        email
        first_name
        last_name
        phone
        is_admin
        date_joined
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $new_password: String!) {
    resetPassword(token: $token, new_password: $new_password) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($old_password: String!, $new_password: String!) {
    changePassword(old_password: $old_password, new_password: $new_password) {
      success
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $first_name: String
    $last_name: String
    $phone: String
  ) {
    updateProfile(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
    ) {
      success
      message
      user {
        id
        username
        email
        first_name
        last_name
        phone
        is_admin
        date_joined
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

// User mutations
export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $first_name: String
    $last_name: String
    $phone: String
    $is_admin: Boolean
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      is_admin: $is_admin
    ) {
      success
      message
      user {
        id
        username
        email
        first_name
        last_name
        phone
        is_admin
        date_joined
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $phone: String
    $isAdmin: Boolean
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isAdmin: $isAdmin
    ) {
      success
      message
      user {
        id
        username
        email
        firstName
        lastName
        phone
        isAdmin
        dateJoined
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

// News mutations
export const CREATE_NEWS = gql`
  mutation CreateNews(
    $title: String!
    $content: String!
    $coverImage: String
  ) {
    createNews(
      title: $title
      content: $content
      coverImage: $coverImage
    ) {
      success
      message
      news {
        id
        title
        content
        coverImage
        author {
          id
          username
        }
        publishedAt
        updatedAt
        isPublished
      }
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews(
    $id: ID!
    $title: String
    $content: String
    $coverImage: String
    $isPublished: Boolean
  ) {
    updateNews(
      id: $id
      title: $title
      content: $content
      coverImage: $coverImage
      isPublished: $isPublished
    ) {
      success
      message
      news {
        id
        title
        content
        coverImage
        author {
          id
          username
        }
        publishedAt
        updatedAt
        isPublished
      }
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteNews(id: $id) {
      success
      message
    }
  }
`;

// Event mutations
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $date: DateTime!
    $location: String!
    $coverImage: String
    $fee: Decimal
    $maxParticipants: Int
  ) {
    createEvent(
      title: $title
      description: $description
      date: $date
      location: $location
      coverImage: $coverImage
      fee: $fee
      maxParticipants: $maxParticipants
    ) {
      success
      message
      event {
        id
        title
        description
        date
        location
        coverImage
        fee
        maxParticipants
        currentRegistrations
        createdAt
        updatedAt
        isPublished
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $description: String
    $date: DateTime
    $location: String
    $coverImage: String
    $fee: Decimal
    $maxParticipants: Int
    $isPublished: Boolean
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      date: $date
      location: $location
      coverImage: $coverImage
      fee: $fee
      maxParticipants: $maxParticipants
      isPublished: $isPublished
    ) {
      success
      message
      event {
        id
        title
        description
        date
        location
        coverImage
        fee
        maxParticipants
        currentRegistrations
        createdAt
        updatedAt
        isPublished
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      success
      message
    }
  }
`;

export const REGISTER_FOR_EVENT = gql`
  mutation RegisterForEvent(
    $eventId: ID!
    $additionalNotes: String
  ) {
    registerForEvent(
      eventId: $eventId
      additionalNotes: $additionalNotes
    ) {
      success
      message
      registration {
        id
        event {
          id
          title
          date
          location
        }
        status
        additionalNotes
        createdAt
        updatedAt
      }
    }
  }
`;

// Contact mutations
export const CREATE_CONTACT_MESSAGE = gql`
  mutation CreateContactMessage(
    $name: String!
    $email: String!
    $message: String!
  ) {
    createContactMessage(
      name: $name
      email: $email
      message: $message
    ) {
      success
      message
      contactMessage {
        id
        name
        email
        message
        createdAt
        isRead
      }
    }
  }
`;


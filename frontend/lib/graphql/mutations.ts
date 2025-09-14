import { gql } from '@apollo/client';

// Authentication mutations
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
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
    $first_name: String
    $last_name: String
    $phone: String
    $is_admin: Boolean
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
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
    $cover_image: String
  ) {
    createNews(
      title: $title
      content: $content
      cover_image: $cover_image
    ) {
      success
      message
      news {
        id
        title
        content
        cover_image
        author {
          id
          username
        }
        published_at
        updated_at
        is_published
      }
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation UpdateNews(
    $id: ID!
    $title: String
    $content: String
    $cover_image: String
    $is_published: Boolean
  ) {
    updateNews(
      id: $id
      title: $title
      content: $content
      cover_image: $cover_image
      is_published: $is_published
    ) {
      success
      message
      news {
        id
        title
        content
        cover_image
        author {
          id
          username
        }
        published_at
        updated_at
        is_published
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
    $cover_image: String
    $fee: Decimal
    $max_participants: Int
  ) {
    createEvent(
      title: $title
      description: $description
      date: $date
      location: $location
      cover_image: $cover_image
      fee: $fee
      max_participants: $max_participants
    ) {
      success
      message
      event {
        id
        title
        description
        date
        location
        cover_image
        fee
        max_participants
        current_registrations
        created_at
        updated_at
        is_published
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
    $cover_image: String
    $fee: Decimal
    $max_participants: Int
    $is_published: Boolean
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      date: $date
      location: $location
      cover_image: $cover_image
      fee: $fee
      max_participants: $max_participants
      is_published: $is_published
    ) {
      success
      message
      event {
        id
        title
        description
        date
        location
        cover_image
        fee
        max_participants
        current_registrations
        created_at
        updated_at
        is_published
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
    $event_id: ID!
    $additional_notes: String
  ) {
    registerForEvent(
      event_id: $event_id
      additional_notes: $additional_notes
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
        additional_notes
        created_at
        updated_at
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
      contact_message {
        id
        name
        email
        message
        created_at
        is_read
      }
    }
  }
`;

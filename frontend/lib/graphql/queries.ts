import { gql } from '@apollo/client';

// User queries
export const GET_ME = gql`
  query GetMe {
    me {
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
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
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
`;

// News queries
export const GET_NEWS = gql`
  query GetNews {
    news {
      id
      title
      content
      cover_image
      author {
        id
        username
        first_name
        last_name
      }
      published_at
      updated_at
      is_published
    }
  }
`;

export const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: ID!) {
    news_article(id: $id) {
      id
      title
      content
      cover_image
      author {
        id
        username
        first_name
        last_name
      }
      published_at
      updated_at
      is_published
    }
  }
`;

// Event queries
export const GET_EVENTS = gql`
  query GetEvents {
    events {
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
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
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
`;

export const GET_MY_REGISTRATIONS = gql`
  query GetMyRegistrations {
    my_registrations {
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
`;

// Contact queries
export const GET_CONTACT_MESSAGES = gql`
  query GetContactMessages {
    contact_messages {
      id
      name
      email
      message
      created_at
      is_read
    }
  }
`;

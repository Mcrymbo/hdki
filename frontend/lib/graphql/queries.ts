import { gql } from '@apollo/client';

// User queries
export const GET_ME = gql`
  query GetMe {
    me {
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
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
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
`;

// News queries
export const GET_NEWS = gql`
  query GetNews {
    news {
      id
      title
      content
      coverImage
      author {
        id
        username
        firstName
        lastName
      }
      publishedAt
      updatedAt
      isPublished
    }
  }
`;

export const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: ID!) {
    newsArticle(id: $id) {
      id
      title
      content
      coverImage
      author {
        id
        username
        firstName
        lastName
      }
      publishedAt
      updatedAt
      isPublished
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
      coverImage
      fee
      maxParticipants
      currentRegistrations
      createdAt
      updatedAt
      isPublished
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
      coverImage
      fee
      maxParticipants
      currentRegistrations
      createdAt
      updatedAt
      isPublished
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
      additionalNotes
      createdAt
      updatedAt
    }
  }
`;

// Contact queries
export const GET_CONTACT_MESSAGES = gql`
  query GetContactMessages {
    contactMessages {
      id
      name
      email
      message
      createdAt
      isRead
    }
  }
`;


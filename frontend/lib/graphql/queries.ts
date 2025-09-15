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

// Content queries
export const GET_DOJO_LOCATIONS = gql`
  query GetDojoLocations {
    dojoLocations {
      id
      name
      address
      city
      country
      mapLink
      description
      coverImage
    }
  }
`;

export const GET_DOJO_LOCATION = gql`
  query GetDojoLocation($id: ID!) {
    dojoLocation(id: $id) {
      id
      name
      address
      city
      country
      mapLink
      description
      coverImage
      instructors {
        id
        name
        rank
        photo
      }
    }
  }
`;

export const GET_GALLERY_ITEMS = gql`
  query GetGalleryItems {
    galleryItems {
      id
      title
      image
      description
      uploadedAt
    }
  }
`;

export const GET_INSTRUCTORS = gql`
  query GetInstructors {
    instructors {
      id
      name
      rank
      bio
      photo
      dojoLocation {
        id
        name
        city
        country
      }
    }
  }
`;

export const GET_INSTRUCTOR = gql`
  query GetInstructor($id: ID!) {
    instructor(id: $id) {
      id
      name
      rank
      bio
      photo
      dojoLocation {
        id
        name
        address
        city
        country
        mapLink
      }
    }
  }
`;

export const GET_KARATE_ADVENTURES = gql`
  query GetKarateAdventures {
    karateAdventures {
      id
      title
      description
      startDate
      endDate
      location
      coverImage
    }
  }
`;

export const GET_KARATE_ADVENTURE = gql`
  query GetKarateAdventure($id: ID!) {
    karateAdventure(id: $id) {
      id
      title
      description
      startDate
      endDate
      location
      coverImage
    }
  }
`;


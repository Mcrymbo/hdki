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

// Content mutations (admin-only)
export const CREATE_DOJO_LOCATION = gql`
  mutation CreateDojoLocation(
    $name: String!
    $address: String!
    $city: String!
    $country: String!
    $mapLink: String
    $description: String
    $coverImage: String
  ) {
    createDojoLocation: createDojoLocation(
      name: $name
      address: $address
      city: $city
      country: $country
      mapLink: $mapLink
      description: $description
      coverImage: $coverImage
    ) {
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

export const UPDATE_DOJO_LOCATION = gql`
  mutation UpdateDojoLocation(
    $id: ID!
    $name: String
    $address: String
    $city: String
    $country: String
    $mapLink: String
    $description: String
    $coverImage: String
  ) {
    updateDojoLocation: updateDojoLocation(
      id: $id
      name: $name
      address: $address
      city: $city
      country: $country
      mapLink: $mapLink
      description: $description
      coverImage: $coverImage
    ) {
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

export const DELETE_DOJO_LOCATION = gql`
  mutation DeleteDojoLocation($id: ID!) {
    deleteDojoLocation(id: $id)
  }
`;

export const CREATE_GALLERY_ITEM = gql`
  mutation CreateGalleryItem($title: String!, $image: String!, $description: String) {
    createGalleryItem: createGalleryItem(title: $title, image: $image, description: $description) {
      id
      title
      image
      description
      uploadedAt
    }
  }
`;

export const DELETE_GALLERY_ITEM = gql`
  mutation DeleteGalleryItem($id: ID!) {
    deleteGalleryItem(id: $id)
  }
`;

export const CREATE_INSTRUCTOR = gql`
  mutation CreateInstructor(
    $name: String!
    $rank: String!
    $bio: String
    $photo: String
    $dojoLocationId: ID!
  ) {
    createInstructor: createInstructor(
      name: $name
      rank: $rank
      bio: $bio
      photo: $photo
      dojoLocationId: $dojoLocationId
    ) {
      id
      name
      rank
      bio
      photo
      dojoLocation { id name }
    }
  }
`;

export const UPDATE_INSTRUCTOR = gql`
  mutation UpdateInstructor(
    $id: ID!
    $name: String
    $rank: String
    $bio: String
    $photo: String
    $dojoLocationId: ID
  ) {
    updateInstructor: updateInstructor(
      id: $id
      name: $name
      rank: $rank
      bio: $bio
      photo: $photo
      dojoLocationId: $dojoLocationId
    ) {
      id
      name
      rank
      bio
      photo
      dojoLocation { id name }
    }
  }
`;

export const DELETE_INSTRUCTOR = gql`
  mutation DeleteInstructor($id: ID!) {
    deleteInstructor(id: $id)
  }
`;

export const CREATE_KARATE_ADVENTURE = gql`
  mutation CreateKarateAdventure(
    $title: String!
    $description: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $location: String!
    $coverImage: String
  ) {
    createKarateAdventure: createKarateAdventure(
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      coverImage: $coverImage
    ) {
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

export const UPDATE_KARATE_ADVENTURE = gql`
  mutation UpdateKarateAdventure(
    $id: ID!
    $title: String
    $description: String
    $startDate: DateTime
    $endDate: DateTime
    $location: String
    $coverImage: String
  ) {
    updateKarateAdventure: updateKarateAdventure(
      id: $id
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      coverImage: $coverImage
    ) {
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

export const DELETE_KARATE_ADVENTURE = gql`
  mutation DeleteKarateAdventure($id: ID!) {
    deleteKarateAdventure(id: $id)
  }
`;


// Simple test to verify Apollo client and GraphQL connection
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Test query
const TEST_QUERY = gql`
  query {
    __schema {
      types {
        name
      }
    }
  }
`;

// Test registration mutation
const REGISTER_MUTATION = gql`
  mutation {
    registerUser(
      username: "testuser"
      email: "test@example.com"
      password: "testpassword123"
      first_name: "Test"
      last_name: "User"
    ) {
      success
      message
      user {
        id
        username
        email
      }
    }
  }
`;

async function testGraphQL() {
  console.log('Testing GraphQL connection...');
  
  try {
    // Test 1: Schema introspection
    console.log('1. Testing schema introspection...');
    const { data: schemaData } = await client.query({
      query: TEST_QUERY
    });
    console.log('✅ Schema introspection successful');
    console.log('Available types:', schemaData.__schema.types.length);
    
    // Test 2: Registration mutation
    console.log('2. Testing registration mutation...');
    const { data: registerData } = await client.mutate({
      mutation: REGISTER_MUTATION
    });
    console.log('✅ Registration mutation successful');
    console.log('Response:', registerData);
    
  } catch (error) {
    console.error('❌ GraphQL test failed:', error);
    if (error.networkError) {
      console.error('Network error:', error.networkError);
    }
    if (error.graphQLErrors) {
      console.error('GraphQL errors:', error.graphQLErrors);
    }
  }
}

// Run the test
testGraphQL();





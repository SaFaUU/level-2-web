export const typeDefs = `#graphql
type Query {
    me: User
    users: [User]
    posts: [Post]
    getSingleUser(id: ID!): Profile
    profile(userId: ID!): Profile
}

type Mutation {
    signup(
        name: String!
        email: String!
        password: String!
        bio: String
    ): AuthPayload

    signin(
        email: String!
        password: String!
    ): AuthPayload
    
    addPost(
      post: PostInput!
    ): PostPayload

    updatePost(
      postId: ID!
      post: PostInput
    ): PostPayload

    deletePost(
      postId: ID!
    ): PostPayload

    publishPost(
      postId: ID!
    ): PostPayload
    
}

input PostInput {
  title: String
  content: String
}

type PostPayload{
  userError: String
  post: Post
}

type AuthPayload {
  userError: String
  token: String
  profile: Profile
}

 type Post{
   id: ID!
   title: String!
   content: String!
   author : User
   createdAt: String!
   published: Boolean!
 }

 type User {
   id: ID!
   name: String!
   email: String!
   createdAt: String!
   posts: [Post]
   profile: Profile
 }

 type Profile{
   id: ID!
   bio: String!
   createdAt: String!
   user: User!
 }
`;

export const resolvers = {
  Query: {},
  Mutation: {
    signup: (parent: any, args: any, context: any) => {
      console.log(args);
    },
  },
};

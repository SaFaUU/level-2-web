export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        userError: "Title and content are required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: args.post.title,
        content: args.post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: result,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });

    if (!post) {
      return {
        userError: "Post not found",
        post: null,
      };
    }

    if (post.authorId !== userInfo.userId) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const result = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: result,
    };
  },
};

import { checkUserAccess } from "../../utils/checkUserAccess";

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

    console.log(result);
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

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);

    if (error) {
      return error;
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

  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);

    if (error) {
      return error;
    }

    const result = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      userError: null,
      post: result,
    };
  },

  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);

    if (error) {
      return error;
    }

    const result = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: result,
    };
  },
};

export const checkUserAccess = async (
  prisma: any,
  userId: any,
  postId: any
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  if (!post) {
    return {
      userError: "Post not found",
      post: null,
    };
  }

  if (post.authorId !== userId) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }
};

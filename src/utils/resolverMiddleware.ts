const authResolver = resolverFunction => async (parent, args, context, info) => {
  if (!context.req.user) {
    throw new Error("UnAuthorized");
  }

  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default authResolver;

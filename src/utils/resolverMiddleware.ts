const authResolver = (resolverFunction) => (parent, args, context, info) => {
    if(!context.req.user){
     throw new Error("UnAuthorized")
    }

    const resolved = resolverFunction(parent, args, context, info);
    return resolved;
}

export default authResolver;
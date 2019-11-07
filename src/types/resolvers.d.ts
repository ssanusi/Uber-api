export type Resolver = (parent:any, args:any, context:any, info:any) => any

export interface Resolvers {
    [key: String] : {
        [key: String] : Resolver
    }

}
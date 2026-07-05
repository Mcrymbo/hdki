declare module "apollo-upload-client" {
  import type { ApolloLink } from "@apollo/client";
  import type { HttpOptions } from "@apollo/client/link/http";

  export function createUploadLink(options?: HttpOptions): ApolloLink;
}

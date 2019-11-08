export const typeDefs = ["type Chat {\n  id: ID!\n  messages: [Message]!\n  paticipants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  user: User!\n  chat: Chat!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: ID!\n  name: String!\n  log: Float!\n  lat: Float!\n  address: String!\n  isFav: Boolean!\n  createdAt: String!\n  updateAt: String\n}\n\ntype Ride {\n  id: ID!\n  status: String!\n  pickupAddress: String!\n  pickupLog: Float!\n  pickupLat: Float!\n  dropOffAddress: String!\n  dropOffLog: Float!\n  dropOffLat: Float!\n  price: Float!\n  duration: String!\n  driver: User!\n  passanger: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ninput EmailSignInInput {\n  email: String!\n  password: String!\n}\n\ntype EmailSignInResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  emailSignIn(input: EmailSignInInput): EmailSignInResponse!\n  emailSignUp(input: EmailSignUpInput!): EmailSignUpResponse!\n  facebookConnect(input: FacebookUserInput!): FacebookResponse!\n}\n\ninput EmailSignUpInput {\n  firstName: String!\n  lastName: String!\n  email: String!\n  password: String!\n  profilePhoto: String!\n  age: Int!\n}\n\ntype EmailSignUpResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ninput FacebookUserInput {\n  firstName: String!\n  lastName: String!\n  email: String\n  fbId: String!\n}\n\ntype FacebookResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ntype User {\n  id: ID!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  age: Int\n  email: String\n  verifiedEmail: Boolean!\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String!\n  isDriving: Boolean!\n  isTaken: Boolean!\n  isRiding: Boolean!\n  lastLat: Float\n  lastLog: Float\n  lastOrientation: Float\n  chat: Chat\n  fbId: String\n  messages: [Message]\n  rideAsPassanger: [Ride]\n  rideAsDriver: [Ride]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n\ntype Verification {\n  id: ID!\n  target: String!\n  payload: String!\n  key: String!\n  used: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  age: number | null;
  email: string | null;
  verifiedEmail: boolean;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string;
  isDriving: boolean;
  isTaken: boolean;
  isRiding: boolean;
  lastLat: number | null;
  lastLog: number | null;
  lastOrientation: number | null;
  chat: Chat | null;
  fbId: string | null;
  messages: Array<Message> | null;
  rideAsPassanger: Array<Ride> | null;
  rideAsDriver: Array<Ride> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: string;
  messages: Array<Message>;
  paticipants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: string;
  text: string;
  user: User;
  chat: Chat;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: string;
  status: string;
  pickupAddress: string;
  pickupLog: number;
  pickupLat: number;
  dropOffAddress: string;
  dropOffLog: number;
  dropOffLat: number;
  price: number;
  duration: string;
  driver: User;
  passanger: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  emailSignIn: EmailSignInResponse;
  emailSignUp: EmailSignUpResponse;
  facebookConnect: FacebookResponse;
}

export interface EmailSignInMutationArgs {
  input: EmailSignInInput | null;
}

export interface EmailSignUpMutationArgs {
  input: EmailSignUpInput;
}

export interface FacebookConnectMutationArgs {
  input: FacebookUserInput;
}

export interface EmailSignInInput {
  email: string;
  password: string;
}

export interface EmailSignInResponse {
  status: string;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
}

export interface EmailSignUpResponse {
  status: string;
  error: string | null;
  token: string | null;
}

export interface FacebookUserInput {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface FacebookResponse {
  status: string;
  error: string | null;
  token: string | null;
}

export interface Place {
  id: string;
  name: string;
  log: number;
  lat: number;
  address: string;
  isFav: boolean;
  createdAt: string;
  updateAt: string | null;
}

export interface Verification {
  id: string;
  target: string;
  payload: string;
  key: string;
  used: boolean;
  createdAt: string;
  updatedAt: string | null;
}

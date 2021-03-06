export const typeDefs = ["type GetChatResponse {\n  status: String!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  getChat(chatId: ID!): GetChatResponse!\n  getMyPlaces: GetMyPlacesResponse!\n  getMyRides: GetMyRidesHistoryResponse!\n  getNearbyRide: GetNearbyRideResponse!\n  getRide(rideId: String!): GetRideResponse!\n  getRideDetails(rideId: String!): GetRideDetailResponse!\n  getMyProfile: GetMyProfileResponse!\n  getNearbyDrivers: GetNearbyDriversResponse!\n  user: User\n}\n\ntype Subscription {\n  messageSubscription: Message\n  nearbyRideSubscription: Ride\n  rideStatusSubscription: Ride\n  driverSubscription: User\n}\n\ntype SendChatMessageResponse {\n  status: String!\n  error: String\n  message: Message\n}\n\ninput SendChatMessageInput {\n  text: String!\n  chatId: ID!\n}\n\ntype Mutation {\n  sendChatMessage(input: SendChatMessageInput!): SendChatMessageResponse!\n  addPlace(input: AddPlacesInput): AddPlaceResponse!\n  deletePlace(placeId: String!): DeletePlaceResponse!\n  editPlace(input: EditPlaceInput!): EditPlaceResponse!\n  requestRide(input: RequestRideInput): RequestRideResponse!\n  updateRideStatus(input: updateRideStatusInput!): UpdateRideStatusResponse!\n  completeEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  completePhoneVerification(input: CompletePhoneVerificationInput!): CompletePhoneVerificationResponse!\n  emailSignIn(input: EmailSignInInput!): EmailSignInResponse!\n  emailSignUp(input: EmailSignUpInput!): EmailSignUpResponse!\n  facebookConnect(input: FacebookUserInput!): FacebookResponse!\n  reportMovement(input: ReportMovementInput!): ReportMovementResponse!\n  requestEmailVerification: RequestEmailVerificationResponse!\n  startPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  toggleDrivingMode: ToggleDrivingModeResponse!\n  updateMyProfile(input: UpdateMyProfileInput!): UpdateMyProfileResponse!\n}\n\ntype Chat {\n  id: ID!\n  messages: [Message]!\n  passengerId: ID!\n  passenger: User!\n  driverId: ID\n  driver: User!\n  rideId: ID\n  ride: Ride!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: ID!\n  text: String!\n  chatId: ID!\n  user: User!\n  chat: Chat!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  status: String!\n  error: String\n}\n\ninput AddPlacesInput {\n  name: String!\n  log: Float!\n  lat: Float!\n  address: String!\n  isFav: Boolean!\n}\n\ntype DeletePlaceResponse {\n  status: String!\n  error: String\n}\n\ntype EditPlaceResponse {\n  status: String!\n  error: String\n}\n\ninput EditPlaceInput {\n  placeId: String!\n  name: String\n  isFav: Boolean\n}\n\ntype GetMyPlacesResponse {\n  status: String!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: ID!\n  name: String!\n  lat: Float!\n  log: Float!\n  address: String!\n  isFav: Boolean!\n  userId: ID!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetMyRidesHistoryResponse {\n  status: String!\n  error: String\n  rides: [Ride]\n}\n\ntype GetNearbyRideResponse {\n  status: String!\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  status: String!\n  error: String\n  ride: Ride\n}\n\ntype GetRideDetailResponse {\n  status: String!\n  error: String\n  ride: Ride\n}\n\ntype RequestRideResponse {\n  status: String!\n  error: String\n  ride: Ride\n}\n\nenum statusType {\n  ACCEPTED\n  CANCELED\n  TRANSIT\n  REQUESTING\n  FINISHED\n}\n\ninput RequestRideInput {\n  status: statusType!\n  pickupAddress: String!\n  pickupLog: Float!\n  pickupLat: Float!\n  dropOffAddress: String!\n  dropOffLog: Float!\n  dropOffLat: Float!\n  price: Float!\n  duration: String!\n}\n\ntype Ride {\n  id: ID!\n  status: String!\n  pickupAddress: String!\n  pickupLog: Float!\n  pickupLat: Float!\n  dropOffAddress: String!\n  dropOffLog: Float!\n  dropOffLat: Float!\n  price: Float!\n  duration: String!\n  driver: User\n  driverId: String\n  passenger: User!\n  passengerId: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateRideStatusResponse {\n  status: String!\n  error: String\n}\n\ninput updateRideStatusInput {\n  status: statusType!\n  rideId: String!\n}\n\ntype CompleteEmailVerificationResponse {\n  status: String!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ninput CompletePhoneVerificationInput {\n  phoneNumber: String!\n  key: String!\n}\n\ninput EmailSignInInput {\n  email: String!\n  password: String!\n}\n\ntype EmailSignInResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ninput EmailSignUpInput {\n  firstName: String!\n  lastName: String!\n  email: EmailAddress!\n  password: String!\n  profilePhoto: String!\n  phoneNumber: String!\n  age: Int!\n}\n\ntype EmailSignUpResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ninput FacebookUserInput {\n  firstName: String!\n  lastName: String!\n  email: String\n  fbId: String!\n}\n\ntype FacebookResponse {\n  status: String!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  status: String!\n  error: String\n  user: User\n}\n\ntype GetNearbyDriversResponse {\n  status: String!\n  error: String\n  drivers: [User]\n}\n\ntype ReportMovementResponse {\n  status: String!\n  error: String\n}\n\ninput ReportMovementInput {\n  lastLat: Float\n  lastLog: Float\n  lastOrientation: Float\n}\n\ntype RequestEmailVerificationResponse {\n  status: String!\n  error: String\n}\n\nscalar EmailAddress\n\ntype User {\n  id: ID!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  age: Int\n  email: EmailAddress\n  verifiedEmail: Boolean!\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String!\n  isDriving: Boolean!\n  isTaken: Boolean!\n  isRiding: Boolean!\n  lastLat: Float\n  lastLog: Float\n  lastOrientation: Float\n  places: [Place]\n  chatAsDriver: [Chat]\n  chatAsPassenger: [Chat]\n  fbId: String\n  messages: [Message]\n  rideAsPassenger: [Ride]\n  rideAsDriver: [Ride]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  status: String!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  status: String!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  status: String!\n  error: String\n}\n\ninput UpdateMyProfileInput {\n  firstName: String\n  lastName: String\n  email: EmailAddress\n  password: String\n  profilePhoto: String\n  age: Int\n}\n\ntype Verification {\n  id: ID!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  getChat: GetChatResponse;
  getMyPlaces: GetMyPlacesResponse;
  getMyRides: GetMyRidesHistoryResponse;
  getNearbyRide: GetNearbyRideResponse;
  getRide: GetRideResponse;
  getRideDetails: GetRideDetailResponse;
  getMyProfile: GetMyProfileResponse;
  getNearbyDrivers: GetNearbyDriversResponse;
  user: User | null;
}

export interface GetChatQueryArgs {
  chatId: string;
}

export interface GetRideQueryArgs {
  rideId: string;
}

export interface GetRideDetailsQueryArgs {
  rideId: string;
}

export interface GetChatResponse {
  status: string;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: string;
  messages: Array<Message>;
  passengerId: string;
  passenger: User;
  driverId: string | null;
  driver: User;
  rideId: string | null;
  ride: Ride;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: string;
  text: string;
  chatId: string;
  user: User;
  chat: Chat;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string | null;
  age: number | null;
  email: EmailAddress | null;
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
  places: Array<Place> | null;
  chatAsDriver: Array<Chat> | null;
  chatAsPassenger: Array<Chat> | null;
  fbId: string | null;
  messages: Array<Message> | null;
  rideAsPassenger: Array<Ride> | null;
  rideAsDriver: Array<Ride> | null;
  createdAt: string;
  updatedAt: string | null;
}

export type EmailAddress = any;

export interface Place {
  id: string;
  name: string;
  lat: number;
  log: number;
  address: string;
  isFav: boolean;
  userId: string;
  user: User;
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
  driver: User | null;
  driverId: string | null;
  passenger: User;
  passengerId: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyPlacesResponse {
  status: string;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetMyRidesHistoryResponse {
  status: string;
  error: string | null;
  rides: Array<Ride> | null;
}

export interface GetNearbyRideResponse {
  status: string;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  status: string;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideDetailResponse {
  status: string;
  error: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  status: string;
  error: string | null;
  user: User | null;
}

export interface GetNearbyDriversResponse {
  status: string;
  error: string | null;
  drivers: Array<User> | null;
}

export interface Mutation {
  sendChatMessage: SendChatMessageResponse;
  addPlace: AddPlaceResponse;
  deletePlace: DeletePlaceResponse;
  editPlace: EditPlaceResponse;
  requestRide: RequestRideResponse;
  updateRideStatus: UpdateRideStatusResponse;
  completeEmailVerification: CompleteEmailVerificationResponse;
  completePhoneVerification: CompletePhoneVerificationResponse;
  emailSignIn: EmailSignInResponse;
  emailSignUp: EmailSignUpResponse;
  facebookConnect: FacebookResponse;
  reportMovement: ReportMovementResponse;
  requestEmailVerification: RequestEmailVerificationResponse;
  startPhoneVerification: StartPhoneVerificationResponse;
  toggleDrivingMode: ToggleDrivingModeResponse;
  updateMyProfile: UpdateMyProfileResponse;
}

export interface SendChatMessageMutationArgs {
  input: SendChatMessageInput;
}

export interface AddPlaceMutationArgs {
  input: AddPlacesInput | null;
}

export interface DeletePlaceMutationArgs {
  placeId: string;
}

export interface EditPlaceMutationArgs {
  input: EditPlaceInput;
}

export interface RequestRideMutationArgs {
  input: RequestRideInput | null;
}

export interface UpdateRideStatusMutationArgs {
  input: updateRideStatusInput;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  input: CompletePhoneVerificationInput;
}

export interface EmailSignInMutationArgs {
  input: EmailSignInInput;
}

export interface EmailSignUpMutationArgs {
  input: EmailSignUpInput;
}

export interface FacebookConnectMutationArgs {
  input: FacebookUserInput;
}

export interface ReportMovementMutationArgs {
  input: ReportMovementInput;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  input: UpdateMyProfileInput;
}

export interface SendChatMessageInput {
  text: string;
  chatId: string;
}

export interface SendChatMessageResponse {
  status: string;
  error: string | null;
  message: Message | null;
}

export interface AddPlacesInput {
  name: string;
  log: number;
  lat: number;
  address: string;
  isFav: boolean;
}

export interface AddPlaceResponse {
  status: string;
  error: string | null;
}

export interface DeletePlaceResponse {
  status: string;
  error: string | null;
}

export interface EditPlaceInput {
  placeId: string;
  name: string | null;
  isFav: boolean | null;
}

export interface EditPlaceResponse {
  status: string;
  error: string | null;
}

export interface RequestRideInput {
  status: statusType;
  pickupAddress: string;
  pickupLog: number;
  pickupLat: number;
  dropOffAddress: string;
  dropOffLog: number;
  dropOffLat: number;
  price: number;
  duration: string;
}

export type statusType = "ACCEPTED" | "CANCELED" | "TRANSIT" | "REQUESTING" | "FINISHED";

export interface RequestRideResponse {
  status: string;
  error: string | null;
  ride: Ride | null;
}

export interface updateRideStatusInput {
  status: statusType;
  rideId: string;
}

export interface UpdateRideStatusResponse {
  status: string;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  status: string;
  error: string | null;
}

export interface CompletePhoneVerificationInput {
  phoneNumber: string;
  key: string;
}

export interface CompletePhoneVerificationResponse {
  status: string;
  error: string | null;
  token: string | null;
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
  email: EmailAddress;
  password: string;
  profilePhoto: string;
  phoneNumber: string;
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

export interface ReportMovementInput {
  lastLat: number | null;
  lastLog: number | null;
  lastOrientation: number | null;
}

export interface ReportMovementResponse {
  status: string;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  status: string;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  status: string;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  status: string;
  error: string | null;
}

export interface UpdateMyProfileInput {
  firstName: string | null;
  lastName: string | null;
  email: EmailAddress | null;
  password: string | null;
  profilePhoto: string | null;
  age: number | null;
}

export interface UpdateMyProfileResponse {
  status: string;
  error: string | null;
}

export interface Subscription {
  messageSubscription: Message | null;
  nearbyRideSubscription: Ride | null;
  rideStatusSubscription: Ride | null;
  driverSubscription: User | null;
}

export interface Verification {
  id: string;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

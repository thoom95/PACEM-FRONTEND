export interface UserDomain {
    userId: number;
    jwtToken: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    status: string;
    profileImage?: string;
}

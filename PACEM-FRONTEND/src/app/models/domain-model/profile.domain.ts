export interface ProfileDomain {
    backgroundImage: string;
    profilePicture: string;
    aboutMe: string;
    hobbies: Hobby[];
    firstname: string;
    lastname: string;
    status: string;
}

export interface Hobby {
    name: string;
}

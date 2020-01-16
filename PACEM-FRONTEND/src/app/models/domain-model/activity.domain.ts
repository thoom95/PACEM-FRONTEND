export interface ActivityDomain {
    activityId: number;
    maxParticipants: number;
    name: string;
    location?: ActivityLocationDomain;
    startTime?: string;
    endTime?: string;
    isParticipating: boolean;
    participants: ActivityParticipantsDomain[];
}

export interface ActivityLocationDomain {
    locationId: number;
    street: string;
    city: string;
    region: string;
    postalCode: string;
    info: string;
    longitude?: string;
    latitude?: string;
}

export interface ActivityParticipantsDomain {
    userId: number;
    isMe: boolean;
    firstName: string;
    lastName: string;
}


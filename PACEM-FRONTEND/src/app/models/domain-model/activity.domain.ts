export interface ActivityDomain {
    activityId: number;
    title: string;
    location?: ActivityLocationDomain;
    participating: boolean;
    participants: ActivityParticipantsDomain[];
}

export interface ActivityLocationDomain {
    startTime?: string;
    endTime?: string;
    startLocation?: string;
    locationInfo?: string;
}

export interface ActivityParticipantsDomain {
    userId: number;
    isMe: boolean;
    FirstName: string;
    LastName: string;
}

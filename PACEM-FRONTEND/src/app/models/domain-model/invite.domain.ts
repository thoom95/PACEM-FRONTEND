import {ActivityDomain} from './activity.domain';
import {UserDomain} from './user.domain';

export interface InviteDomain {
    invitee: UserDomain;
    inviter: UserDomain;
    activity: ActivityDomain;
}

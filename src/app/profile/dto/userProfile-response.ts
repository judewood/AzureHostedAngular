import { User } from "./user";
import { ApiFeedback } from "./api-feedback";

export class UserProfileResponse {
    apiFeedback! : ApiFeedback 
    userProfile!: User;
}
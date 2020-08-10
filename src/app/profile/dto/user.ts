import { AdditionalData } from './AdditionalData';

export class User {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    additionalData!: AdditionalData;
}

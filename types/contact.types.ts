import { Pagination } from "../types";


export interface CaseContacts {
    contactName: string;
    contactPhoneNumber: string;
    contactEmail: string;
}

export interface ContactsState {
    isLoading: boolean;
    contacts: string[];
}

export interface GetContactsResponse extends Pagination {
    data: {
        cases: CaseContacts[]
    }
}

export interface ContactsResponse {
    data: {
        case: CaseContacts
    }
}

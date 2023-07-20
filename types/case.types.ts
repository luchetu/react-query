import { Pagination } from "../types";


export interface CaseDetails {
    caseNumber: string;
    caseTitle: string;
    caseType: string;
    partiesInvolved: string;
    caseStatus: string;
    deadlines: string;
    caseDescription: string;
    caseNotes: string;
}

export interface CaseState {
    cases: string[];
    isLoading: boolean;
    case: CaseDetails | null; // Specify the type of the `case` property
}

export interface GetCasesResponse extends Pagination {
    data: {
        cases: CaseDetails[]
    }
}

export interface CaseResponse {
    data: {
        case: CaseDetails
    }
}


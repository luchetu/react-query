import { Pagination } from "../types";


export interface DocsState {
    docs: string[];
    isLoading: boolean;
    doc: {}
}

export interface Docs {
    title: string;
    meta: string[];
    documents: string;
}

export interface GetDocsResponse extends Pagination {
    data: {
        docs: Docs[]
    }
}

export interface DocResponse {
    data: {
        doc: Docs
    }
}
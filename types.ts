export interface Joke {
    id?: number;
    Title?: string;
    Body?: string;
    Author?: string;
}
export interface Pagination {
    page: number,
    limit: number
}

export interface TokenStore {
    token?: string
    setToken?: (token: string) => void
    clearToken?: () => void
}

export interface ModeStore {
    mode: string;
    toggleMode: () => void;
}
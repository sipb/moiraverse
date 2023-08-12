export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type UserInfo = {
    "full_name": string,
    "names": {
        "first": string,
        "middle": string,
        "last": string,
    }
    "kerb": string,
    "mit_id": number,
    "class_year": string,
};

export type MoiraObject = "list" | "machine" | "filesys" | string;

export type Belonging = {
    "type": MoiraObject,
    "name": string,
};

export type MoiraException = {
    "code": number,
    "message": string,
}
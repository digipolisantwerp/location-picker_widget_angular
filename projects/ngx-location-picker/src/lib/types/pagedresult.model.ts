export interface Page {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

type Resource<T, PropertyName extends string> = {
    [P in PropertyName]: T[];
}

interface Links {
    first: Link;
    prev: Link;
    self: Link;
    next: Link;
    last: Link;
}

interface Link {
    href: string;
}

// export expose the interface for other components
export interface PagedResult<PropertyName extends string, T = any> {
    _links?: Links;
    _embedded: Resource<T, PropertyName>;
    _page: Page;
}
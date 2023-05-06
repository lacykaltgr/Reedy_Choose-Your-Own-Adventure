export declare class BookDto {
    pages: PageDto[];
}
declare class PageDto {
    page_number: number;
    page: string;
    choices: ChoiceDto[];
}
declare class ChoiceDto {
    choice: string;
    jump_to: number;
}
export {};

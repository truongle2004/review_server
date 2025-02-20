/* eslint-disable @typescript-eslint/no-wrapper-object-types */
export class CreateCommentInputDTO{
    private _reviewId:string
    private _userId: string
    private _parentId:string
    private _content: string

    constructor(reviewId: string, userId: string, parentId: string, content: string) {
        this._reviewId = reviewId;
        this._userId = userId;
        this._parentId = parentId;
        this._content = content;
    }

    get reviewId(): string {
        return this._reviewId;
    }

    set reviewId(value: string) {
        this._reviewId = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get parentId(): string {
        return this._parentId;
    }

    set parentId(value: string) {
        this._parentId = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }
}

export class CreateCommentOutputDTO{
    private _commentId: string
    private _userId: string
    private _reviewId: string
    private _content: string
    private _parentId: string
    private _createdAt: string


    constructor(commentId: string, userId: string, reviewId: string, content: string, parentId: string, createdAt: string) {
        this._commentId = commentId;
        this._userId = userId;
        this._reviewId = reviewId;
        this._content = content;
        this._parentId = parentId;
        this._createdAt = createdAt;
    }

    get commentId(): string {
        return this._commentId;
    }

    set commentId(value: string) {
        this._commentId = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get reviewId(): string {
        return this._reviewId;
    }

    set reviewId(value: string) {
        this._reviewId = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get parentId(): string {
        return this._parentId;
    }

    set parentId(value: string) {
        this._parentId = value;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }
}
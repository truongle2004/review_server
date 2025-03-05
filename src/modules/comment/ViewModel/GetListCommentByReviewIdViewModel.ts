export class GetListCommentByReviewIdViewModel{
  status: string;
  message: string
  comments: any[];

  constructor(status: string, message: string, comments: any[]) {
    this.status = status
    this.message = message
    this.comments = comments
  }
}
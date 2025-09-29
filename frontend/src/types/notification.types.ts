export interface INotification {
    id: string;
    message: string;
    read: boolean;
}
export interface IResNotification {
    success: boolean,
    message: string,
    data: INotification[]
}
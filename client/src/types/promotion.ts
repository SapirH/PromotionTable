
export interface Promotion {
    _id: string;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    user_group: string;
}

export const PromotionKeys = ['name' ,'type' ,'start_date' ,'end_date' ,'user_group'];

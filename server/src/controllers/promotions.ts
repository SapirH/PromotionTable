import { Request, Response, NextFunction, Handler } from 'express';
import { Promotion } from '../types/promotion';
import { IOperationBuilder } from './operations/types';
import operationBuilder from './operations';
import config from '../config';

const collectionName = config.collections.promotions.name;

const promotionsOperationBuilder: IOperationBuilder<Promotion> = operationBuilder<Promotion>();

export const getAllPromotions: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotions: Promotion[] = await promotionsOperationBuilder.getAll(collectionName);
        res.json(promotions);
    } catch (err) {
        next(err);
    }
};

export const getPromotionsByPage: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotions: Promotion[] = await promotionsOperationBuilder.getItemsByRange(collectionName, parseInt(req.params.rangeStart), config.pageAmount);
        res.json(promotions);
    } catch (err) {
        next(err);
    }
};

export const duplicatePromotion: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotion: Promotion = req.body.promotion;
        delete promotion._id;
        res.json(await promotionsOperationBuilder.insertOne(collectionName, promotion));      
    } catch (err) {
        next(err);
    }
};

export const deletePromotion: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotionId: string = req.params.id;
        res.json(await promotionsOperationBuilder.deleteById(collectionName, promotionId));      
    } catch (err) {
        next(err);
    }
};

export const updatePromotion: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotionId: string = req.params.id;
        const updatedPromotion: Promotion = req.body.updatedPromotion;
        delete updatedPromotion._id;
        res.json(await promotionsOperationBuilder.updateOne(collectionName, promotionId, updatedPromotion));      
    } catch (err) {
        next(err);
    }
};

export const createMockPromotions: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let promotionMock: Object[] = createPromotionMock();
        const data: any = await promotionsOperationBuilder.insertMany(collectionName, promotionMock);
        promotionMock = promotionMock.map((promotion: Object, index: number) => ({ ...promotion, _id: data.insertedIds[index]}));
        res.json(promotionMock);      
    } catch (err) {
        next(err);
    }
};

const createPromotionMock = () => {
    const today = new Date;
    const start_date = today.toISOString();
    const end_date = (new Date(today.setMonth(today.getMonth() +1))).toISOString();
    let mockPromotions: Object[] = [];
    let promotion: Object = {}

    for (let i = 0; i < config.mockAmount; i++) {
        promotion = {
            name: `promo${i}`,
            type: 'Common',
            start_date,
            end_date,
            user_group: `group${i}`
        }
        mockPromotions.push(promotion)
    }
    return mockPromotions;
}
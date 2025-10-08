import { ICreateCategoryDTO, IUpdateCategoryDTO } from "../dtos/category.dto";
import CategoryModel  from "../models/category.model";
import { ICategoryRepo } from "./interfaces/category.repo.interface";
import { injectable } from "tsyringe";
import { Category } from "../types/category.type";
import { Document, UpdateQuery } from "mongoose";

@injectable()
export class CategoryRepo implements ICategoryRepo {


    async getAll(): Promise<Category[]> {
        return CategoryModel.find({ isDeleted: false }).exec();
    }
    
    async getById(id: string): Promise<Category | null> {
        return CategoryModel.findOne({ _id: id, isDeleted: false }).exec();
    }

    async create(data: ICreateCategoryDTO): Promise<Category> {
        const newCategory = await CategoryModel.create(data);
        return newCategory;
    }

    async update(id: string, data: IUpdateCategoryDTO): Promise<Category | null> {
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            { _id: id, isDeleted: false }, 
            { $set: data },
            { new: true } 
        ).exec();
        return updatedCategory;
    }

 
    async delete(id: string): Promise<Category | null> {
        const deletedCategory = await CategoryModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true }
        ).exec();
        return deletedCategory;
    }
}
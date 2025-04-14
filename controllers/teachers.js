import { teacherModel } from "../models/teachers.js";
import { addTeacherValidator } from "../validators/teachers.js"


export const addTeacher = async (req, res, next) => {
    try {
        const { error, value } = addTeacherValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        const result = await teacherModel.create(value);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const getTeacherById = async (req, res, next) => {
    try {
        const singleTeacher = await teacherModel.findById(req.params.id);
        if (!singleTeacher) {
            return res.status(422).json('Teacher not found!');
        }
        res.status(200).json(singleTeacher);
    } catch (error) {
        next(error);
    }
}

export const getAllTeachers = async (req, res, next) => {
    try {
        const allTeachers = await teacherModel.find();
        res.status(200).json(allTeachers);
    } catch (error) {
        next (error);
    }
}

export const updateTeacher = async (req, res, next) => {
    try {
        const editTeacher = await teacherModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true, runValidators:true }
        );
        if (!editTeacher) {
            return res.status(404).json('Teacher not found!')
        }
        res.status(201).json(editTeacher);
    } catch (error) {
        next(error)
    }
}

export const deleteTeacher = async (req, res, next) => {
    try {
        const clearTeacher = await teacherModel.findByIdAndDelete(req.params.id);
        if (!clearTeacher) {
            return res.status(404).json('Teacher not found');
        }
        res.status(200).json('Deleted successfully!');
    } catch (error) {
        next(error);
    }
}
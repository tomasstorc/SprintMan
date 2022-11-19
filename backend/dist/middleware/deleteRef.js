"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Programme_1 = __importDefault(require("../model/Programme"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_response_1 = __importDefault(require("../response/error-response"));
const logger_1 = __importDefault(require("../utils/logger"));
const deleteRef = (req, res, next) => {
    let subjectId = new mongoose_1.default.Types.ObjectId(req.params.id);
    Programme_1.default.find({}, (err, foundProgrammes) => {
        if (err) {
            logger_1.default.error(`There was an problem finding programmes, reason: ${err}`);
            return res.status(400).json(new error_response_1.default(err));
        }
        foundProgrammes.map((program) => {
            var _a, _b, _c;
            if ((_a = program.osubjects) === null || _a === void 0 ? void 0 : _a.includes(subjectId)) {
                Programme_1.default.updateOne({ _id: program._id }, { $pull: { osubjects: subjectId } }, (err, updateProgramme) => {
                    console.log(updateProgramme);
                    if (err) {
                        logger_1.default.error(`There was an problem deleteting subject from program, reason ${err}`);
                        return res.status(400).json(new error_response_1.default(err));
                    }
                    logger_1.default.info(`Subject ${subjectId} successfully deleted from program ${program.name} - osubject`);
                });
            }
            else if ((_b = program.ssubjects) === null || _b === void 0 ? void 0 : _b.includes(subjectId)) {
                Programme_1.default.updateOne({ _id: program._id }, { $pull: { ssubjects: { _id: subjectId } } }, (err, updateProgramme) => {
                    if (err) {
                        logger_1.default.error(`There was an problem deleteting subject from program, reason ${err}`);
                        return res.status(400).json(new error_response_1.default(err));
                    }
                    logger_1.default.info(`Subject ${subjectId} successfully deleted from program ${program.name} - ssubjects`);
                });
            }
            else if ((_c = program.ossubjects) === null || _c === void 0 ? void 0 : _c.includes(subjectId)) {
                Programme_1.default.updateOne({ _id: program._id }, { $pull: { ossubjects: { _id: subjectId } } }, (err, updateProgramme) => {
                    if (err) {
                        logger_1.default.error(`There was an problem deleteting subject from program, reason ${err}`);
                        return res.status(400).json(new error_response_1.default(err));
                    }
                    logger_1.default.info(`Subject ${subjectId} successfully deleted from program ${program.name} - ossubjects`);
                });
            }
        });
        next();
    });
};
exports.default = deleteRef;

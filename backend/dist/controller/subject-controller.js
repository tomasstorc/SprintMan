"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Subject_1 = __importDefault(require("../model/Subject"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const isAdminOrEditor_1 = __importDefault(require("../middleware/isAdminOrEditor"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const router = express_1.default.Router();
router.get("/", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Subject_1.default.find((err, subjectList) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (subjectList.length < 1) {
            return res
                .status(200)
                .json(new success_response_1.default("empty", "no subjects found"));
        }
        else {
            return res
                .status(200)
                .json(new success_response_1.default("success", subjectList));
        }
    });
});
router.get("/:id", (req, res) => {
    Subject_1.default.findById(req.params.id, (err, foundSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (!foundSubject) {
            return res.status(404).json(new error_response_1.default("not found"));
        }
        else {
            return res
                .status(200)
                .json(new success_response_1.default("success", foundSubject));
        }
    });
});
router.post("/", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    const newSubject = new Subject_1.default(req.body);
    newSubject.save((err, createdSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(201)
            .json(new success_response_1.default("created", createdSubject));
    });
});
router.put("/:id", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Subject_1.default.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedSubject.value));
    });
});
router.delete("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    Subject_1.default.findByIdAndDelete(req.params.id, (err, deletedSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res.status(204).json(new success_response_1.default("deleted"));
    });
});
// create topic
router.post("/:id/topic", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Subject_1.default.findByIdAndUpdate(req.params.id, { $push: { topics: req.body } }, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("added", updatedSubject));
    });
});
router.put("/:id/topic/", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Subject_1.default.findByIdAndUpdate(req.params.id, { $set: { topics: req.body } }, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedSubject));
    });
});
router.delete("/:id/topic", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Subject_1.default.findByIdAndUpdate(req.params.id, { $pull: { topics: req.body } }, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("deleted", updatedSubject));
    });
});
router.post("/:id/material", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    if (req.body.topicId) {
        Subject_1.default.findById(req.params.id, (err, foundSubject) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            const topic = foundSubject.topics.filter((topic) => new mongoose_1.default.Schema.Types.ObjectId(req.params.topicId) ===
                topic._id);
            foundSubject.topics.pull(topic);
            topic.push(req.body.material);
            foundSubject.topics.push(topic);
            foundSubject.save((err, updatedSubject) => {
                if (err) {
                    return res.status(400).json(new error_response_1.default(err));
                }
                return res
                    .status(200)
                    .json(new success_response_1.default("added", updatedSubject));
            });
        });
    }
    else {
        Subject_1.default.findByIdAndUpdate(req.params.id, { $push: { materials: req.body } }, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("added", updatedSubject));
        });
    }
});
router.delete("/:id/material", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    if (req.body.topicId) {
        Subject_1.default.findById(req.params.id, (err, foundSubject) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            const topic = foundSubject.topics.filter((topic) => new mongoose_1.default.Schema.Types.ObjectId(req.params.topicId) ===
                topic._id);
            foundSubject.topics.pull(topic);
            topic.pull(req.body.material);
            foundSubject.topics.push(topic);
            foundSubject.save((err, updatedSubject) => {
                if (err) {
                    return res.status(400).json(new error_response_1.default(err));
                }
                return res
                    .status(200)
                    .json(new success_response_1.default("added", updatedSubject));
            });
        });
    }
    else {
        Subject_1.default.findByIdAndUpdate(req.params.id, { $pull: { materials: req.body } }, { runValidators: true, new: true, rawResult: true }, (err, updatedSubject) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("added", updatedSubject));
        });
    }
});
exports.default = router;

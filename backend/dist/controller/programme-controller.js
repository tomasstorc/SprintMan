"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const isAdminOrEditor_1 = __importDefault(require("../middleware/isAdminOrEditor"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const Programme_1 = __importDefault(require("../model/Programme"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const router = express_1.default.Router();
const options = { runValidators: true, new: true, rawResult: true };
router.get("/", (req, res) => {
    Programme_1.default.find((err, programmes) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (programmes.length < 1) {
            return res
                .status(200)
                .json(new success_response_1.default("empty", "no study programmes found"));
        }
        else {
            return res.status(200).json(new success_response_1.default("success", programmes));
        }
    })
        .populate("osubjects")
        .populate("ssubjects")
        .populate("ossubjects");
});
router.get("/:id", (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (!foundProgramme) {
            return res.status(404).json(new error_response_1.default("not found"));
        }
        else {
            return res
                .status(200)
                .json(new success_response_1.default("succesws", foundProgramme));
        }
    });
});
router.post("/", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    const newProgramme = new Programme_1.default(req.body);
    if (newProgramme.degree === "Ing.")
        newProgramme.icon =
            "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school.png";
    newProgramme.save((err, programmeCreated) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(201)
            .json(new success_response_1.default("created", programmeCreated));
    });
});
router.put("/:id", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true, rawResult: true }, (err, updatedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedProgramme.value));
    });
});
router.delete("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    Programme_1.default.findByIdAndDelete(req.params.id, (err, deletedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res.status(204).json(new success_response_1.default("deleted"));
    });
});
router.post("/:id/osubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.osubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.post("/:id/ssubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ssubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.post("/:id/ossubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findById(req.params.id, (err, foundProgramme) => {
        var _a;
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        for (let i = 0; i < req.body.ids.length; i++) {
            (_a = foundProgramme === null || foundProgramme === void 0 ? void 0 : foundProgramme.ossubjects) === null || _a === void 0 ? void 0 : _a.push(req.body.ids[i]);
        }
        foundProgramme.save((err, updatedProgramme) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res
                .status(200)
                .json(new success_response_1.default("updated", updatedProgramme));
        });
    });
});
router.delete("/:id/osubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findByIdAndUpdate(req.params.id, {
        $pull: { osubjects: { $in: req.body.ids } },
    }, { runValidators: true, new: true, rawResult: true, multi: true }, (err, updatedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedProgramme.value));
    });
});
router.delete("/:id/ssubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findByIdAndUpdate(req.params.id, {
        $pull: { ssubjects: { $in: req.body.ids } },
    }, { runValidators: true, new: true, rawResult: true, multi: true }, (err, updatedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedProgramme.value));
    });
});
router.delete("/:id/ossubject", isAuthenticated_1.default, isAdminOrEditor_1.default, (req, res) => {
    Programme_1.default.findByIdAndUpdate(req.params.id, {
        $pull: { ossubjects: { $in: req.body.ids } },
    }, { runValidators: true, new: true, rawResult: true, multi: true }, (err, updatedProgramme) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res
            .status(200)
            .json(new success_response_1.default("updated", updatedProgramme.value));
    });
});
exports.default = router;

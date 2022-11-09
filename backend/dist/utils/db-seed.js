"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = __importDefault(require("../model/Subject"));
const Programme_1 = __importDefault(require("../model/Programme"));
const newProgrammeList = [
    {
        name: "Software development",
        description: "This will teach you how to develop software",
        degree: "Bc.",
        length: 3,
        language: "czech",
        icon: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png",
    },
];
const newSubjectList = [
    {
        name: "Java development",
        goal: "this will teach how to develp java programs",
        language: "czech",
        teacher: "Jan Novy",
        supervisor: "Petr Maly",
        credits: 6,
        degree: "Bc.",
    },
];
const dbSeed = () => {
    Programme_1.default.find((err, programmeList) => {
        if (err) {
            console.error(`error find programmes, reason: ${err}`);
        }
        if ((programmeList === null || programmeList === void 0 ? void 0 : programmeList.length) < 1) {
            newProgrammeList.forEach((programmeSave) => {
                let newProgramme = new Programme_1.default(programmeSave);
                newProgramme.save(() => {
                    console.log(`successfully added programme to db`);
                });
            });
        }
    });
    Subject_1.default.find((err, subjectList) => {
        if (err) {
            console.error(`error find subjects, reason: ${err}`);
        }
        if ((subjectList === null || subjectList === void 0 ? void 0 : subjectList.length) < 1) {
            newSubjectList.forEach((subjectSave) => {
                let newSubject = new Programme_1.default(subjectSave);
                newSubject.save(() => {
                    console.log(`successfully added subject to db`);
                });
            });
        }
    });
};

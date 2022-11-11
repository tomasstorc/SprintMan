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
        description: "The Software Development bachelor’s study program will show you how to design robust cloud apps in modern programming languages and help you understand various disciplines within software development.",
        degree: "Bc.",
        length: 3,
        language: "czech",
        icon: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png",
        imageUrl: "https://subjectmansa.blob.core.windows.net/subjectmanpics/Component%203.jpeg",
        field: "it",
    },
    {
        name: "Software Engineering and Big Data",
        description: "The master's degree program in Software Engineering and Big Data will teach you to design robust applications, understand advanced artificial intelligence algorithms, work with Big Data and design solutions for the IoT.",
        degree: "Ing.",
        length: 2,
        language: "czech",
        icon: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school.png?fbclid=IwAR13i_dcLArBnA5TqjGXTVv_KJDZW-AJEWKExeonKQKMIlNoSyCTkdb1S8I",
        imageUrl: "https://subjectmansa.blob.core.windows.net/subjectmanpics/Component%204.jpeg",
        field: "it",
    },
    {
        name: "Business Management",
        description: "Thanks to the bachelor's degree program in Business Management, you will be able to hold management positions, learn how to do modern marketing, get closer to the financial sector and gain the knowledge needed for your own business.",
        degree: "Bc.",
        length: 3,
        language: "czech",
        imageUrl: "https://subjectmansa.blob.core.windows.net/subjectmanpics/Component%201.jpeg",
        field: "business",
    },
    {
        name: "Applied Economics and Data Analysis",
        description: "The master's degree program Applied Economics and Data Analysis will acquaint you not only with advanced economics and work with data, but also with their analysis and interpretation. You will make use of all this in the world of international economic relations.",
        degree: "Ing.",
        icon: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school.png?fbclid=IwAR13i_dcLArBnA5TqjGXTVv_KJDZW-AJEWKExeonKQKMIlNoSyCTkdb1S8I",
        length: 2,
        language: "czech",
        imageUrl: "https://subjectmansa.blob.core.windows.net/subjectmanpics/Component%202.jpeg",
        field: "business",
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
exports.default = dbSeed;

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
        name: "English 1",
        goal: "The course aims at acquainting students with business English and develop their language skills for communication in social and work contact at the A2 CEFR level (Common European Framework of Reference)",
        language: "english",
        teacher: "Elena Johnson",
        supervisor: "Elena Johnson",
        credits: 3,
        degree: "Bc.",
    },
    {
        name: "Software Development Essentials",
        goal: "In this course, you will gain a comprehensive knowledge of software development and get acquainted with various analysis methods and designs of larger software units.",
        language: "czech",
        teacher: "Marek Beránek",
        supervisor: "Marek Beránek",
        credits: 12,
        degree: "Bc.",
    },
    {
        name: "Quality Assurance",
        goal: "The course aims at providing students with the essentials of processes and approaches to quality assurance. It describes the main activities and practices of QA and deals with individual activities from the viewpoint of motivation, processes and assessment methods. The course shows QA principles and their impact in development projects and long-term activities in IT business.",
        language: "czech",
        teacher: "Michal Kökörčený",
        supervisor: "Michal Kökörčený",
        credits: 6,
        degree: "Bc.",
    },
    {
        name: "Product Management",
        goal: "The aim of the course is to teach students the basics of product management, the essence of which is the process of launching a new product on the market (or developing an existing product). Product management begins with an introduction to basic ideas and features of the product from the customer's perspective and it ends with an evaluation of its success in the market. It is a comprehensive set of knowledge and skills, which includes business processes, basic analytics, product development, marketing, and sales. One of the key activities that students will perform during the course is the preparation of a product documentation and strategy. The course is based on teamwork of students to simulate the real environment of a product team.",
        language: "czech",
        teacher: "Jindřich Čadík",
        supervisor: "Jindřich Čadík",
        credits: 9,
        degree: "Bc.",
    },
    {
        name: "Tax",
        goal: "The course aims at providing students with essential knowledge of taxation. The course focuses on Czech tax system, including the social security system.",
        language: "czech",
        teacher: "Savina Finardi",
        supervisor: "Savina Finardi",
        credits: 9,
        degree: "Bc.",
    },
    {
        name: "Strategic Marketing",
        goal: "The course aims at acquainting students with basic categories of modern marketing, especially marketing strategies, essential marketing tools, analysis and purchase behaviour of consumers. The course explains chosen marketing problems based on case studies and helps understand the sense and logic of marketing. As marketing represents a practical discipline, the theoretic lectures are enhanced with lectures by professional experts and component tasks which allow students to apply the taught matter to practice immediately. The course includes a workshop where students solve and present an assigned project in teams.",
        language: "czech",
        teacher: "Zuzana Boháčová",
        supervisor: "Zuzana Boháčová",
        credits: 9,
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

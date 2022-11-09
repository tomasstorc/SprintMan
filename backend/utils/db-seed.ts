import Subject from "../model/Subject";
import Programme from "../model/Programme";
import { CallbackError } from "mongoose";
import IProgramme from "../interface/programme";
import ISubject from "../interface/subject";

const newProgrammeList: Array<IProgramme> = [
  {
    name: "Software development",
    description: "This will teach you how to develop software",
    degree: "Bc.",
    length: 3,
    language: "czech",
    icon: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png",
  },
];

const newSubjectList: Array<ISubject> = [
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
  Programme.find(
    (err: CallbackError | undefined, programmeList: Array<IProgramme>) => {
      if (err) {
        console.error(`error find programmes, reason: ${err}`);
      }
      if (programmeList?.length < 1) {
        newProgrammeList.forEach((programmeSave) => {
          let newProgramme = new Programme(programmeSave);
          newProgramme.save(() => {
            console.log(`successfully added programme to db`);
          });
        });
      }
    }
  );
  Subject.find(
    (err: CallbackError | undefined, subjectList: Array<ISubject>) => {
      if (err) {
        console.error(`error find subjects, reason: ${err}`);
      }
      if (subjectList?.length < 1) {
        newSubjectList.forEach((subjectSave) => {
          let newSubject = new Programme(subjectSave);
          newSubject.save(() => {
            console.log(`successfully added subject to db`);
          });
        });
      }
    }
  );
};

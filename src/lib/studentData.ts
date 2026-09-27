export type StudentStatus = "Enrolled";

export interface StudentRecord {
  name: string;
  rollNumber: string;
  email: string;
  status: StudentStatus;
}

export const studentRecords: StudentRecord[] = [
  { name: "S Muzammil Javed", rollNumber: "494501", email: "muzammil.javed@example.com", status: "Enrolled" },
  { name: "Ayesha Noor", rollNumber: "494502", email: "ayesha.noor@example.com", status: "Enrolled" },
  { name: "Bilal Hassan", rollNumber: "494503", email: "bilal.hassan@example.com", status: "Enrolled" },
  { name: "Fatima Sheikh", rollNumber: "494504", email: "fatima.sheikh@example.com", status: "Enrolled" },
  { name: "Hamza Tariq", rollNumber: "494505", email: "hamza.tariq@example.com", status: "Enrolled" },
  { name: "Zainab Iqbal", rollNumber: "494506", email: "zainab.iqbal@example.com", status: "Enrolled" },
  { name: "Usman Farooq", rollNumber: "494507", email: "usman.farooq@example.com", status: "Enrolled" },
  { name: "Mahnoor Khan", rollNumber: "494508", email: "mahnoor.khan@example.com", status: "Enrolled" },
  { name: "Abdul Wadood", rollNumber: "494509", email: "abdul.wadood@example.com", status: "Enrolled" },
  { name: "Sana Malik", rollNumber: "494510", email: "sana.malik@example.com", status: "Enrolled" },
  { name: "Ahmed Raza", rollNumber: "494511", email: "ahmed.raza@example.com", status: "Enrolled" },
  { name: "Hira Aslam", rollNumber: "494512", email: "hira.aslam@example.com", status: "Enrolled" },
  { name: "Talha Siddiqui", rollNumber: "494513", email: "talha.siddiqui@example.com", status: "Enrolled" },
  { name: "Noor Fatima", rollNumber: "494514", email: "noor.fatima@example.com", status: "Enrolled" },
  { name: "Waqas Ahmed", rollNumber: "494515", email: "waqas.ahmed@example.com", status: "Enrolled" },
  { name: "Iqra Yousuf", rollNumber: "494516", email: "iqra.yousuf@example.com", status: "Enrolled" },
  { name: "Danish Ali", rollNumber: "494517", email: "danish.ali@example.com", status: "Enrolled" },
  { name: "Kiran Shahid", rollNumber: "494518", email: "kiran.shahid@example.com", status: "Enrolled" },
  { name: "Saad Jamil", rollNumber: "494519", email: "saad.jamil@example.com", status: "Enrolled" },
  { name: "Areeba Khalid", rollNumber: "494520", email: "areeba.khalid@example.com", status: "Enrolled" },
  { name: "Rehan Qureshi", rollNumber: "494521", email: "rehan.qureshi@example.com", status: "Enrolled" },
  { name: "Amna Rashid", rollNumber: "494522", email: "amna.rashid@example.com", status: "Enrolled" },
  { name: "Faizan Anwar", rollNumber: "494523", email: "faizan.anwar@example.com", status: "Enrolled" },
  { name: "Laiba Hassan", rollNumber: "494524", email: "laiba.hassan@example.com", status: "Enrolled" },
];

// Every row is "Enrolled" in the real data, but the filter dropdown stays
// generic so a future status (e.g. "Withdrawn") only needs a new union member.
export type StudentFilter = "all" | StudentStatus;

export const studentSummary = {
  total: studentRecords.length,
};
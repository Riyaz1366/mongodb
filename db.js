// 1.Insert to Users Collection:

db.users.insertmany([
  {
    userid: "1",
    name: "Riyaz",
    email: "riyaz33@gmail.com",
    mobile: "99999999",
    role: "student",
  },
  {
    userId: "2",
    name: "afzal",
    email: "afzal33@gmail.com",
    mobile: "999999999",
    role: "mentor",
  },
]);

// 2.Insert to codekata collection:

db.codekata.insertMany([
  {
    codekata_id: "1",
    title: "functions",
  },
  {
    codekata_id: "2",
    title: "functions",
  },
]);

// 3.Insert to attendance collection:
db.attendance.insertMany([
  {
    attendance_id: "1",
    userId: "1",
    date: "02/09/2023",
    status: "absent",
  },
  {
    attendance_id: "2",
    userId: "2",
    date: "02/09/2023",
    status: "present",
  },
]);

// 4.Insert to topics collection:
db.topics.insertMany([
  {
    topic_id: 1,
    topic_name: "react_crud",
    description: [""],
    date: "02/09/2023",
  },
  {
    topic_id: 2,
    topic_name: "react_routerdom",
    description: [""],
    date: "02/09/2023",
  },
]);

//5.Insert to tasks collection
db.tasks.insertMany([
  {
    taskid: "1",
    userId: "1",
    title: "crud app",
    description: "Description of the task",
    deadline: "to date",
    date_assigned: "from date",
    status: "incomplete",
  },

  {
    taskid: "12",
    userId: "2",
    title: "crud app",
    description: "Description of the task",
    deadline: "to date",
    date_assigned: "from date",
    status: "completed",
  },
]);
// 6.Insert to drives collection:
db.drives.insertMany([
  {
    drive_id: "1",
    drive_name: "netflix",
    user_ids: "1",
    location: "chennai",
    contact_information: "email",
    date: ""
  },
  {
    drive_id: "2",
    drive_name: "facebook",
    user_ids: "2",
    location: "chennai",
    contact_information: "email",
    date: ""
  },
]);

// 7.Insert to mentors collection:
db.mentors.insertMany([
  {
    mentor_id: 1,
    name: "Riyaz",
    email: "email",
    specialization: "nodejs",
  },
  {
    mentor_id: 2,
    name: "afzal",
    email: "email",
    specialization: "nodejs",
  },
]);

//Find all the topics and tasks which are thought in the month of October

db.Tasks.aggregate([
    {
      $match: {
        date_assigned: {
          $gte: ISODate(""), 
          $lt: ISODate("") 
        }
      }
    },
    {
      $lookup: {
        from: "Topics",
        localField: "topic_id",
        foreignField: "_id",
        as: "topic"
      }
    },
    {
      $project: {
        _id: 0,
        task_title: "$title",
        topic_name: { $arrayElemAt: ["$topic.topic_name", 0] }
      }
    }
  ])

  //Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

  db.CompanyDrives.aggregate([
    {
      $match: {
        date: {
          $gte: ISODate(""), 
          $lte: ISODate("")  
        }
      }
    }
  ])


  db.drives.aggregate([
    {
      $lookup: {
        from: "Attendance",
        let: { drive_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$class_session_id", "$$drive_id"] },
                  { $eq: ["$status", "Appeared"] }
                ]
              }
            }
          },
          {
            $lookup: {
              from: "Users",
              localField: "user_id",
              foreignField: "_id",
              as: "student"
            }
          },
          {
            $project: {
              _id: 0,
              drive_name: "$company_name",
              student_name: { $arrayElemAt: ["$student.first_name", 0] },
              student_email: { $arrayElemAt: ["$student.email", 0] }
            }
          }
        ],
        as: "attendance"
      }
    },
    {
      $project: {
        _id: 0,
        drive_name: 1,
        attendance: {
          $cond: {
            if: { $gt: [{ $size: "$attendance" }, 0] },
            then: "$attendance",
            else: "No students appeared"
          }
        }
      }
    }
  ])


//Find the number of problems solved by the user in codekata

  db.Tasks.aggregate([
    {
      $match: {
        assigned_to: ObjectId("user_id_here"), 
        status: "Completed"
      }
    },
    {
      $group: {
        _id: "$assigned_to",
        problems_solved: { $sum: 1 }
      }
    }
  ])

//Find all the mentors with who has the mentee's count more than 15

  db.Mentors.aggregate([
    {
      $lookup: {
        from: "Users", 
        localField: "_id",
        foreignField: "mentor_id",
        as: "mentees"
      }
    },
    {
      $project: {
        mentor_name: { $concat: ["$first_name", " ", "$last_name"] },
        mentee_count: { $size: "$mentees" }
      }
    },
    {
      $match: {
        mentee_count: { $gt: 15 }
      }
    }
  ])    

//Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
  db.Users.aggregate([
    {
      $lookup: {
        from: "Attendance",
        localField: "_id",
        foreignField: "user_id",
        as: "attendance"
      }
    },
    {
      $lookup: {
        from: "Tasks",
        localField: "_id",
        foreignField: "assigned_to",
        as: "tasks"
      }
    },
    {
      $match: {
        $and: [
          {
            "attendance.date": {
              $gte: ISODate("date"),
              $lte: ISODate("date")
            }
          },
          {
            $or: [
              { "attendance.status": "Absent" },
              { $and: [{ "tasks.status": "Incomplete" }, { "tasks.date_assigned": { $gte: ISODate("2020-10-15T00:00:00Z"), $lte: ISODate("2020-10-31T23:59:59Z") } }] }
            ]
          }
        ]
      }
    },
    {
      $group: {
        _id: null,
        user_count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        user_count: 1
      }
    }
  ])
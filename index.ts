#!/usr/bin/env node

import inquirer from "inquirer";

class student {
  static counter: number = 10000;
  name: string;
  studentID: number;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.studentID = student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 10000;
  }
  // method to enroll student in a courses
  enrollCourses(course: string) {
    this.courses.push(course);
  }
  //Method to view balance of a student
  viewBalance() {
    console.log(` ${this.name} balance is: ${this.balance}`);
  }
  //Method to pay fees
  payFee(amount: number) {
    this.balance -= amount;
    console.log(`${amount} fee of ${this.name} paid successfully`);
  }
  // Method to show student detail
  showStatus() {
    console.log(`studentId : ${this.studentID}`);
    console.log(`Name : ${this.name}`);
    console.log(`Courses : ${this.courses}`);
    console.log(`Balance : ${this.balance}`);
  }
}

// defin student mangment system
class studentMangmentSystem {
  student: student[];

  constructor() {
    this.student = [];
  }

  // Method to add a new Student
  addStudent(name: string) {
    let Student = new student(name);
    this.student.push(Student);
    console.log(
      `Student ${name} is added sucefully. Student ID is ${Student.studentID}`
    );
  }

  // Method to find Student
  findStudent(student_id: number) {
    return this.student.find((std) => std.studentID === student_id);
  }

  // Method to enroll student in a course
  enrollStudent(student_id: number, course: string) {
    let student = this.findStudent(student_id);
    if (student) {
      student.enrollCourses(course);
      console.log(`${student.name} enrolled in ${course} sucefully `);
    } else {
      console.log("Student not found. Please enter a correct Student ID");
    }
  }
  // Method to view student balance
  viewStudentBalance(student_id: number) {
    let student = this.findStudent(student_id);
    if (student) {
      student.viewBalance();
    } else {
      console.log("Student not found. Please enter a correct Student ID");
    }
  }
  // Method to pay student fee
  payStudentFee(student_id: number, amount: number) {
    let student = this.findStudent(student_id);
    if (student) {
      student.payFee(amount);
    } else {
      console.log("Student not found. Please enter a correct Student ID");
    }
  }

  // Method to view student status
  showStudentStatus(student_id: number) {
    let student = this.findStudent(student_id);
    if (student) {
      student.showStatus();
    } else {
      console.log("Student not found. Please enter a correct Student ID");
    }
  }
}

// main fucntion to run this program
async function main() {
  console.log("Welcome to 'HUZAIFA REHAN' - Student Mangment System ");
  console.log("-".repeat(50));

  let StudentMangmentSystem = new studentMangmentSystem();

  while (true) {
    const choice = await inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "Select an option",
          choices: [
            "Add Student",
            "Enroll Student",
            "View Student Balance",
            "Pay Student Fee",
            "Show Student Status",
            "Exit",
          ],
        },
      ]);
    // using switch case to handle your choice
    switch (choice.choice) {
      case "Add Student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter a Student Name",
          },
        ]);

        StudentMangmentSystem.addStudent(name_input.name);
        break;
      
      
        case "Enroll Student":
          let courseInput = await inquirer.prompt([
            {
              name: "STUDENT_ID",
              type: "number",
              message: "Enter a Student ID",
            },
            {
              name: "Course",
              type: "input",
              message: "Enter a Course name",
            },
          ]);
          StudentMangmentSystem.enrollStudent(courseInput.STUDENT_ID, courseInput.Course);
          break;
      
      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "STUDENT_ID",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        StudentMangmentSystem.viewStudentBalance(balance_input.STUDENT_ID);
        break;
      case "Pay Student Fee":
        let fee_input = await inquirer.prompt([
          {
            name: "STUDENT_ID",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "Amount",
            type: "number",
            message: "Enter the Amount to pay",
          },
        ]);
        StudentMangmentSystem.payStudentFee(
          fee_input.STUDENT_ID,
          fee_input.Amount
        );
        break;
      case "Show Student Status":
        let status_input = await inquirer.prompt([
          {
            name: "STUDENT_ID",
            type: "number",
            message: "Enter a Student ID",
          },
        ]);
        StudentMangmentSystem.showStudentStatus(status_input.STUDENT_ID);
        break;
      case "Exit":
        console.log("Exiting.....");
        process.exit();
    }
  }
}
main();

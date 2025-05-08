//QUESTION (1)

function FeatureToggle(featureName, isEnabled, userGroupAccess) {
  this.featureName = featureName;
  this.isEnabled = isEnabled;
  this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function(userRole) {
  return this.isEnabled && this.userGroupAccess.includes(userRole);
};

FeatureToggle.prototype.toggleFeature = function(flag) {
  this.isEnabled = flag;
};

// Simulation

const feature = new FeatureToggle("Dark Mode", false, ["betaTesters", "admins"]);
feature.toggleFeature(true);

const roles = ["guest", "betaTesters", "admin"];

roles.forEach(role => {
  if (feature.canAccess(role)) {
    switch (role) {
      case "admins":
        console.log(`${role}: Full access granted.`);
        break;
      case "betaTesters":
        console.log(`${role}: Beta access granted.`);
        break;
      default:
        console.log(`${role}: Access granted.`);
    }
  } else {
    console.log(`${role}: Access denied.`);
  }
});


//QUESTION (2)

function TimeLog(freelancerName, projectDetails, logs) {
  this.freelancerName = freelancerName;
  this.projectDetails = projectDetails;
  this.logs = logs;
}

TimeLog.prototype.totalEarnings = function() {
  let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
  return totalHours * this.projectDetails.hourlyRate;
};

TimeLog.prototype.filterLogs = function(startDate, endDate) {
  return this.logs.filter(log => {
    return log.date >= startDate && log.date <= endDate;
  });
};

TimeLog.prototype.weeklyStatus = function() {
  let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
  if (totalHours > 40) {
    console.log("Overtime week.");
  } else {
    console.log("Normal hours.");
  }
};

// Usage

const logs = [
  { date: "2025-05-01", hoursWorked: 10 },
  { date: "2025-05-02", hoursWorked: 12 },
  { date: "2025-05-03", hoursWorked: 20 }
];

const timelog = new TimeLog("Alice", { name: "Website", hourlyRate: 25 }, logs);
console.log("Total Earnings:", timelog.totalEarnings());
console.log("Logs Between Dates:", timelog.filterLogs("2025-05-01", "2025-05-02"));
timelog.weeklyStatus();



//QUESTION (3)

function Order(customer, items, status) {
  this.customer = customer;
  this.items = items;
  this.status = status;
}

Order.prototype.totalCost = function() {
  return this.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateStatus = function(isPaid) {
  this.status = isPaid ? "Paid" : "Pending";
};

Order.prototype.checkUrgency = function() {
  let itemCount = this.items.length;
  switch (true) {
    case (itemCount > 5):
      console.log("High urgency");
      break;
    case (itemCount > 2):
      console.log("Medium urgency");
      break;
    default:
      console.log("Low urgency");
  }
};

// Usage
const order = new Order(
  { name: "John", email: "john@example.com" },
  [
    { productName: "Pen", quantity: 2, unitPrice: 1 },
    { productName: "Notebook", quantity: 1, unitPrice: 5 },
    { productName: "Mouse", quantity: 3, unitPrice: 10 }
  ],
  "Pending"
);

console.log("Total Cost:", order.totalCost());
order.updateStatus(true);
console.log("Updated Status:", order.status);
order.checkUrgency();


//QUESTION (4)

class Employee {
  constructor(id, name, performanceMetrics, feedback) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = performanceMetrics;
    this.feedback = feedback;
  }

  averageScore() {
    const scores = Object.values(this.performanceMetrics);
    return scores.reduce((a, b) => a + b) / scores.length;
  }

  classifyPerformance() {
    const avg = this.averageScore();
    if (avg >= 8) {
      console.log("Excellent performance.");
    } else if (avg >= 5) {
      console.log("Average performance.");
    } else {
      console.log("Needs improvement.");
    }
  }

  addFeedback(comment) {
    if (comment.length > 5) {
      this.feedback.push(comment);
    } else {
      console.log("Feedback too short.");
    }
  }
}

// Usage

const emp = new Employee(1, "Diana", { communication: 9, efficiency: 8, reliability: 7 }, []);
console.log("Average Score:", emp.averageScore());
emp.classifyPerformance();
emp.addFeedback("Great job on teamwork!");
console.log("Feedback:", emp.feedback);


// QUESTION (5)

class Course {
  constructor(title, instructor, students) {
    this.title = title;
    this.instructor = instructor;
    this.students = students;
  }

  getCompletedStudents() {
    return this.students
      .filter(s => s.completionStatus === true)
      .map(s => s.name);
  }

  countByExpertise(expertise) {
    return this.students.filter(s => this.instructor.expertise === expertise).length;
  }

  instructorMessage() {
    const count = this.students.length;
    if (count >= 5) {
      console.log("Experienced instructor with a full class.");
    } else {
      console.log("Instructor is still building a student base.");
    }
  }
}

// Usage
const course = new Course(
  "JavaScript Basics",
  { name: "Mr. Dev", expertise: "Web" },
  [
    { name: "Alice", completionStatus: true },
    { name: "Bob", completionStatus: false },
    { name: "Clara", completionStatus: true }
  ]
);

console.log("Completed Students:", course.getCompletedStudents());
console.log("Count by Expertise:", course.countByExpertise("Web"));
course.instructorMessage();


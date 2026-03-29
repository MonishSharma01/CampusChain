export const student = {
  name: "Indresh Suresh",
  id: "CS2022047",
  department: "Computer Science",
  semester: 6,
  avatar: "IS",
  balance: 1240,
  semesterAllocation: 2000,
  semesterStart: "Jan 2026",
  semesterEnd: "May 2026",
}

export const transactions = [
  { id:"tx001", category:"canteen",  title:"Lunch Special",              amount:-45,  time:"Today 12:30 PM",  hash:"0x4f2a...b91c", status:"success" },
  { id:"tx002", category:"library",  title:"Book Borrow — Clean Code",   amount:-10,  time:"Today 10:15 AM",  hash:"0x8d1c...f23a", status:"success" },
  { id:"tx003", category:"reward",   title:"Hackathon Winner Bonus",      amount:+200, time:"Yesterday",        hash:"0x2b9e...441d", status:"success" },
  { id:"tx004", category:"events",   title:"TechFest Entry",              amount:-50,  time:"Mar 27",           hash:"0x7f3b...c82e", status:"success" },
  { id:"tx005", category:"fees",     title:"Lab Fee Q2",                  amount:-300, time:"Mar 25",           hash:"0x1a4d...9f7b", status:"success" },
  { id:"tx006", category:"transfer", title:"Sent to Divya Sharma",        amount:-80,  time:"Mar 24",           hash:"0x3c8f...d10e", status:"success" },
  { id:"tx007", category:"transfer", title:"Received from Monish Sharma", amount:+50,  time:"Mar 23",           hash:"0x9e2a...c44f", status:"success" },
  { id:"tx008", category:"canteen",  title:"Breakfast",                   amount:-30,  time:"Mar 22",           hash:"0x6b1d...a73c", status:"success" },
]

export const activeFine = {
  bookName: "Clean Code — Robert C. Martin",
  borrowedDate: "Mar 20, 2026",
  dueDate: "Mar 27, 2026",
  daysOverdue: 2,
  finePerDay: 5,
  currentFine: 10,
}

export const weeklySpending = [
  { week:"Wk 1", canteen:120, library:20, events:0,   fees:300 },
  { week:"Wk 2", canteen:95,  library:10, events:50,  fees:0   },
  { week:"Wk 3", canteen:140, library:30, events:0,   fees:0   },
  { week:"Wk 4", canteen:80,  library:0,  events:100, fees:0   },
  { week:"Wk 5", canteen:110, library:20, events:0,   fees:0   },
]

export const categoryBreakdown = [
  { name:"Canteen", value:45, color:"#F5C518" },
  { name:"Events",  value:25, color:"#10B981" },
  { name:"Library", value:20, color:"#3B82F6" },
  { name:"Fees",    value:10, color:"#EF4444" },
]

export const friends = [
  { id:"CS2022031", name:"Divya Sharma",   avatar:"DS", dept:"CSE"  },
  { id:"EC2022018", name:"Ankita Rajbhar", avatar:"AR", dept:"ECE"  },
  { id:"ME2022055", name:"Monish Sharma",  avatar:"MS", dept:"Mech" },
]

export const rewards = [
  { title:"Hackathon 1st Place",   tokens:200, date:"Mar 23", category:"academic" },
  { title:"Top 3 Semester Rank",   tokens:150, date:"Feb 10", category:"academic" },
  { title:"Sports Meet — Gold",    tokens:100, date:"Jan 28", category:"sports"   },
  { title:"Cultural Fest Winner",  tokens:75,  date:"Jan 15", category:"cultural" },
]

export const qrMockPayment = {
  category: "Canteen",
  description: "Lunch Special — Thali Combo",
  amount: 45,
  adminName: "Raj Kumar",
  adminId: "ADMIN-CAN-01",
  timestamp: "Today 12:30 PM",
}

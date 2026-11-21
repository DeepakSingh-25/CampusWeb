export interface CampusModule { name: string; icon: string; sections: string[] }
function module(name: string, icon: string, sections = ''): CampusModule {
  return {name, icon: 'fa-solid fa-' + icon, sections: sections ? sections.split('|') : []};
}
export const modules = [
  module('Dashboard','gauge-high'),
  module('User Directory','address-book','Students|Faculty|Employees|Contractual Staff|Setup'),
  module('Attendance','clock','Student Attendance|Faculty Attendance|Employee Attendance|Contractual Staff Attendance|Subject-Wise|Class-Wise Register|Period-Wise|Attendance Regularization|Shift Management|Roster Management|Setup|Attendance Code|Reports'),
  module('Leave','calendar-days','Leave Calendar|Student Leave|Faculty Leave|Employee Leave|Leave Balances|Setup|Leave Policies|Reports'),
  module('Hostel','building','Hostels|Dormitories|Allotment|Room Transfer|Night Attendance|Night-Out|Gate Pass|Complaints|Biometric Logs|Setup|Device Mapping|Reports'),
  module('Night Out','moon','Night Out Board|Verify Student|Movement Log|Setup'),
  module('Library','book','Book Search|Books|Issue / Return|Reservations|Fines|Members|Setup|Libraries|Categories|Racks & Shelves|Reports'),
  module('Contract Companies','building-user','Company Management|Contracts & Posts|Staff Pool|Daily Deployment|Claims / Bills|Payment / Settlement|Setup|Reports|History / Audit'),
  module('Hardware','microchip','Machine Console|Setup|Reports'),
  module('Settings','gear','Campus Profile|Branches|Departments|Designations|Features|Users & Rights|Approvals|Reminder Alerts|Integrations|Plans & Seats|Trash')
];
export const students = ['Aarav Sharma','Isha Rao','Krish Verma','Pari Pillai','Om Patel','Ananya Chauhan','Advait Iyer','Saanvi Naidu','Ved Bose','Sneha Ghosh'];
export const cards: Record<string,string[][]> = {
  'User Directory': students.map((n,i)=>[n,'B.Tech CSE · Semester 5 · Section A','STU-'+(24001+i),'On Roll']),
  Hostel: [
    ['Aravali Boys Hostel','36 rooms · 109 beds','Devendra Joshi · 14% occupied','Active'],
    ['Nilgiri Boys Hostel','18 rooms · 53 beds','Asha Kamble · 25% occupied','Active'],
    ['Shivalik Girls Hostel','24 rooms · 72 beds','Devendra Joshi · 23% occupied','Active'],
    ['Vindhya Girls Hostel','10 rooms · 32 beds','Asha Kamble · 56% occupied','Maintenance']
  ],
  'Night Out': ['Diya Singh','Ishaan Bose','Meher Naidu','Navya Rao','Neel Verma','Pari Nair'].map((n,i)=>[n,['Shivalik · B-101','Aravali · B-106','Vindhya · A-203','Vindhya · A-105','Aravali · B-301','Vindhya · A-205'][i],'19 November 2026','Without permission']),
  Library: [
    ['Introduction to Algorithms','Thomas H. Cormen et al.','Computer Science','4 on shelf'],
    ['Operating System Concepts','Abraham Silberschatz, Peter B. Galvin','Computer Science','3 on shelf'],
    ['Database System Concepts','Abraham Silberschatz, Henry F. Korth','Computer Science','4 on shelf'],
    ['Computer Networks','Andrew S. Tanenbaum, David J. Wetherall','Computer Science','2 waiting'],
    ['Artificial Intelligence: A Modern Approach','Stuart Russell, Peter Norvig','Computer Science','1 waiting'],
    ['Clean Code','Robert C. Martin','Computer Science','2 waiting'],
    ['Digital Design','M. Morris Mano, Michael D. Ciletti','Electronics','3 on shelf']
  ],
  'Contract Companies': [
    ['Sentinel Facility Services Pvt. Ltd.','Housekeeping · Security · Gardening','82 staff · 64 required per day','Active'],
    ['Vidya Academic Resourcing LLP','Visiting Faculty · Guest Lecturers','8 staff · 5 required per day','Expiring Soon'],
    ['Kaveri Technical Manpower','Lab Assistants · IT Support','10 staff · 7 required per day','Active'],
    ['Annapurna Catering & Mess Services','Cafeteria · Mess · Catering','8 staff','Expired'],
    ['Marudhar Transport Contractors','Bus Drivers · Conductors','11 staff · 9 required per day','On Hold'],
    ['Sarasvati Food Services Pvt. Ltd.','Cafeteria · Mess · Catering','11 staff · 8 required per day','Active']
  ],
  Hardware: [
    ['ZKTeco SpeedFace V5L','Main Gate · North Campus','v3.2.40 · 10.20.4.11','Online'],
    ['Mantra MFS110','Hostel Gate · Hostel Block','v6.60 · 10.20.4.12','Online'],
    ['Suprema BioStation 3','Pedestrian Gate B · East Wing','v1.4.2 · 10.20.4.13','Online'],
    ['Realtime T502','Library Entrance · Central Block','v3.9 · 10.20.4.41','Offline']
  ]
};
export const stats = [
  ['86.9%','Attendance Today','10 absent','clock','purple','Attendance'],
  ['17','Students Outside','7 unauthorised','moon','cyan','Night Out'],
  ['24%','Hostel Occupancy','194 beds free','building','warning','Hostel'],
  ['27','Pending Leave','19 overdue','calendar-days','danger','Leave']
];
export const widgets = [
 {title:'Needs Attention',target:'Leave',labels:['Leave approvals','Hostel complaints','Absent today','Overdue books','Outside without permission','Overdue returns','Claims to review','Devices offline'],values:[27,12,10,8,7,3,3,1],color:'#ec486a'},
 {title:'Students Outside Now',target:'Night Out',labels:['Diya Singh','Ishaan Bose','Meher Naidu','Navya Rao'],values:[],color:'#00a4b6'},
 {title:'Daily Attendance',target:'Attendance',labels:['On Time','Absent','Late','Half Day','Leave','On Duty','Remote','Week Off','Holiday'],values:[174,10,9,6,17,10,3,0,0],color:'#179f62'},
 {title:'Hostel Occupancy',target:'Hostel',labels:['Vindhya Girls Hostel','Nilgiri Boys Hostel','Shivalik Girls Hostel','Aravali Boys Hostel'],values:[56,25,23,14],color:'#8553de'},
 {title:'Leave Queue',target:'Leave',labels:['Employees','Faculty','Students'],values:[11,10,6],color:'#eb881b'},
 {title:'Library Circulation',target:'Library',labels:['Computer Science','Mathematics','Competitive Exams','Mechanical','Physics','Electronics'],values:[12,3,3,3,2,2],color:'#1396b5'}
];
export const profileDefaults = {'Campus Name':'National Law University, Jodhpur','Legal Entity Name':'National Law University, Jodhpur','GSTIN':'08AAAJN0195M1ZT','PAN':'AAAJN0195M','Contact Email':'nlu-jod-rj@nic.in','Phone':'+91-291-2577530, 2577526','Financial Year Start':'April','Default Currency':'INR (Rs.)','Registered Address':'NH-62, Nagour Road, Mandore, Jodhpur – 342304 (Raj.) – INDIA'};


export interface CatalogEntry { key: string; group: string; name: string; active: boolean }
export interface AttendanceSettings { workingDayStart: string; workingDayEnd: string; graceMinutes: number }
export interface DirectorySettings { defaultView: 'Grid' | 'List'; studentIdPrefix: string; facultyIdPrefix: string; employeeIdPrefix: string }
export interface CampusSetup { attendance: AttendanceSettings; directory: DirectorySettings; entries: CatalogEntry[] }

export const catalogs = [
  {key:'programmes', title:'Programmes', column:'Programme', icon:'graduation-cap', academic:true},
  {key:'classes-sections', title:'Classes & Sections', column:'Class / Section', icon:'laptop', academic:true},
  {key:'student-categories', title:'Student Categories', column:'Category', icon:'users', academic:false},
  {key:'guardian-relations', title:'Guardian Relations', column:'Relation', icon:'house-user', academic:false},
  {key:'blood-groups', title:'Blood Groups', column:'Blood group', icon:'droplet', academic:false}
] as const;
export type Catalog = typeof catalogs[number];

export interface CatalogEntry { id:string; name:string; active:boolean }
export interface Catalog { title:string; column:string; icon:string; description:string; academic:boolean; names:string[] }

const programmes=['B.Com','B.E. Civil','B.E. ECE','B.E. Mech','B.Sc Physics','B.Tech CSE'];
export const catalogs:Catalog[]=[
  {title:'Programmes',column:'Programme',icon:'graduation-cap',description:'Degrees on offer. Maintained with the academic structure in Attendance Setup.',academic:true,names:programmes},
  {title:'Classes & Sections',column:'Class / Section',icon:'laptop',description:'Class sections grouped by programme.',academic:true,names:programmes.flatMap(p=>['A','B'].map(s=>p+' · Section '+s))},
  {title:'Student Categories',column:'Category',icon:'users',description:'Categories used in student records.',academic:false,names:['General','EWS','OBC','SC','ST','International','Other']},
  {title:'Guardian Relations',column:'Relation',icon:'house-user',description:'Relationships available for guardian contacts.',academic:false,names:['Father','Mother','Brother','Sister','Grandfather','Grandmother','Uncle','Aunt','Legal guardian']},
  {title:'Blood Groups',column:'Blood group',icon:'droplet',description:'Blood groups used on profiles and identity cards.',academic:false,names:['A+','A−','B+','B−','AB+','AB−','O+','O−']}
];

export interface AttendanceCode { code:string; meaning:string; credit:number; category:string }
export interface RegisterStudent { key:string; id:string; name:string; programme:string; section:string; semester:number; admitted:string }
export interface StudentRegister {
  month:string; today:string; revision:string|null; locked:boolean; codes:AttendanceCode[]; students:RegisterStudent[];
  marks:{studentId:string;day:string;code:string}[];
}

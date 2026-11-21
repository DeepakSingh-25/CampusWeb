export interface CardHolder { name:string; id:string; photo:number; blood:string; programme:string; residence:string; admitted:string; mentor:string; semester?:number; section?:string; designation?:string; kind?:'Faculty'|'Employee'|'Contractual Staff' }
import qrcode from 'qrcode-generator';

export const fieldNames=['Photograph','Institution logo','Institution name','Person code','Class / section','Department','Residence','Blood group','Admission date','Valid until','Mentor','QR code','Barcode'];
export interface CardStyle { accent:string; design:string; fields:Set<string>; width:number; height:number }
const photos=new Map<number,Promise<HTMLImageElement | null>>();
function photo(index:number){
  if(!photos.has(index))photos.set(index,new Promise(resolve=>{
    const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);
    img.src='assets/id-photos/user'+index+'.png';
  }));
  return photos.get(index)!;
}
const qrCache=new Map<string,ReturnType<typeof qrcode>>();
function drawQr(ctx:CanvasRenderingContext2D,id:string,x:number,y:number,size:number){
  let qr=qrCache.get(id);
  if(!qr){qr=qrcode(0,'M');qr.addData(id);qr.make();qrCache.set(id,qr);}
  const n=qr.getModuleCount(),u=size/(n+8);
  ctx.fillStyle='#fff';ctx.fillRect(x,y,size,size);ctx.fillStyle='#151515';
  for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.isDark(r,c))ctx.fillRect(x+(c+4)*u,y+(r+4)*u,u+.12,u+.12);
}
// Code 39 patterns used by the campus STU-nnnnn identifiers, including start/stop.
const bars:Record<string,number>={'0':0x034,'1':0x121,'2':0x061,'3':0x160,'4':0x031,'5':0x130,'6':0x070,'7':0x025,'8':0x124,'9':0x064,S:0x046,T:0x016,U:0x181,'-':0x085,'*':0x094};
function barcode(ctx:CanvasRenderingContext2D,id:string,x:number,y:number,width:number,height:number){
  const chars=('*'+id+'*').split('');
  const unit=width/(chars.length*16-1);
  ctx.fillStyle='#111';
  for(const c of chars){for(let i=0;i<9;i++){const w=(bars[c]&(1<<(8-i))?3:1)*unit;if(i%2===0)ctx.fillRect(x,y,w,height);x+=w;}x+=unit;}
}
export async function renderCard(s:CardHolder,campus:string,style:CardStyle,rear:boolean){
  const portrait=style.height>style.width;
  const W=portrait?390:620,H=W*style.height/style.width;
  const canvas=document.createElement('canvas');
  const scale=Math.min(3,1600/Math.max(W,H));
  canvas.width=Math.round(W*scale);canvas.height=Math.round(H*scale);
  const c=canvas.getContext('2d')!;c.scale(canvas.width/W,canvas.height/H);
  // Design in a standard card coordinate system, including custom print sizes.
  const baseH=portrait?570:390;c.scale(1,H/baseH);
  const fields=style.fields, has=(key:string)=>fields.has(key);
  const ink='#192030',muted='#636c80';
  function text(value:string,x:number,y:number,size:number,weight=500,color=ink,max=W-x-16){
    c.fillStyle=color;c.font=weight+' '+size+'px Arial, sans-serif';c.fillText(value,x,y,max);
  }
  function box(x:number,y:number,w:number,h:number,color:string){c.fillStyle=color;c.fillRect(x,y,w,h);}
  box(0,0,W,baseH,'#fff');
  const band=style.design==='Midnight'?'#202938':style.design==='Minimal'?'#eef0f4':style.design==='Vertical Badge'?'#302d3d':style.accent;
  const heading=style.design==='Minimal'?ink:'#fff';
  box(0,0,W,88,band);if(style.design==='Side Band')box(0,88,9,baseH-88,style.accent);
  if(style.design==='Vertical Badge'||style.design==='Minimal')box(0,81,W,7,style.accent);
  const titleX=has('Institution logo')?82:20;
  if(has('Institution logo')){
    const initials=campus.split(/[ ,]+/).filter(Boolean).slice(0,3).map(w=>w[0]).join('').toUpperCase();
    c.fillStyle='#fff';c.beginPath();c.arc(45,43,28,0,Math.PI*2);c.fill();c.strokeStyle='#d4ab50';c.lineWidth=2;c.stroke();
    text(initials,23,50,19,800,'#815d0c',44);
  }
  if(has('Institution name'))text(campus,titleX,43,portrait?21:28,800,heading,W-titleX-16);
  text((s.kind?.toUpperCase() || (s.designation?'FACULTY':'STUDENT'))+(rear?' INFORMATION':' IDENTITY CARD'),titleX,67,15,700,heading);
  const footerY=baseH-65;
  if(rear){
    text(s.name,22,132,29,750);text('If found, please return this card to the campus office.',22,168,16);
    text('This card is issued for campus identification.',22,196,15,500,muted);
    if(has('Mentor'))text((s.designation?'Contact: ':'Mentor: ')+s.mentor,22,235,16);
    if(has('Person code'))text(s.id,22,264,16,700);
    if(has('QR code'))drawQr(c,s.id,W-101,footerY-98,92);
  }else{
    const px=22,py=105,pw=portrait?92:129,ph=portrait?104:145;
    if(has('Photograph')){
      const img=s.photo?await photo(s.photo):null;
      box(px,py,pw,ph,'#e5eff0');
      if(img){const crop=Math.min(img.width/pw,img.height/ph);c.drawImage(img,(img.width-pw*crop)/2,(img.height-ph*crop)/2,pw*crop,ph*crop,px,py,pw,ph);}
      else{text(s.name.split(' ').map(w=>w[0]).join('').slice(0,2),px+14,py+ph*.62,36,750,'#327f79',pw-28);}
    }
    if(has('Blood group')){const by=has('Photograph')?py+ph+10:py;box(px,by,pw,25,'#ffebeb');text('BLOOD  '+s.blood,px+9,by+18,13,750,'#ac2833');}
    const x=has('Photograph')||has('Blood group')?px+pw+18:px;
    const qrSize=portrait?76:100;
    const nameWidth=W-x-(has('QR code')&&!portrait?qrSize+18:18);
    text(s.name,x,139,portrait?25:34,800,ink,nameWidth);
    if(has('Class / section'))text(s.designation || ('Sem '+s.semester+' · Sec '+s.section),x,169,18,650,'#926800',nameWidth);
    if(has('QR code'))drawQr(c,s.id,W-qrSize-15,portrait?201:100,qrSize);
    const year=Number(s.admitted.slice(0,4))+4;
    const entries=[['Person code',s.kind==='Contractual Staff'?'Staff ID':s.designation?'Employee ID':'Admission no.',s.id],['Department',s.kind==='Contractual Staff'?'Company':'Department',s.programme],
      ['Residence',s.designation?'Campus block':'Residence',s.residence],['Admission date',s.designation?'Joined on':'Admitted on',s.admitted.split('-').reverse().join('-')],['Valid until','Valid until','30-06-'+year]].filter(([key])=>has(key) && !(s.designation && key==='Valid until'));
    const startX=portrait?22:x,startY=portrait?302:197,colWidth=portrait?172:(W-x-24)/2;
    entries.forEach(([,label,value],i)=>{const col=i%2,row=Math.floor(i/2),fx=startX+col*colWidth,fy=startY+row*42;
      text(label.toUpperCase(),fx,fy,11,700,muted);text(value,fx,fy+18,16,700,ink,colWidth-7);});
  }
  box(0,footerY,W,65,'#f4f5f8');
  if(has('Barcode')){barcode(c,s.id,22,footerY+10,portrait?135:194,23);text(s.id,22,footerY+49,12,650,ink);}
  if(has('Mentor'))text(s.mentor,W*.51,footerY+38,14,600,muted,W*.46);
  return canvas;
}


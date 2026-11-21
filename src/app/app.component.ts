import { Component, HostListener, Type } from '@angular/core';
import { MyProfile } from './pages/account/my-profile/my-profile.component';
import { StudentDesk } from './pages/account/student-desk/student-desk.component';
import { ChangePassword } from './pages/account/change-password/change-password.component';
import { SignedOut } from './pages/account/signed-out/signed-out.component';
import { accountEmail, accountName, initials } from './pages/account/account-state';
import { NgComponentOutlet } from '@angular/common';
import { MachineConsole } from './pages/hardware/machine-console/machine-console.component';
import { pages } from './pages/pages';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { SettingsCampusProfilePage } from './pages/settings/campus-profile/campus-profile.component';
import { menuGroups, menuIcons } from './data/menu-appearance';
import { LeaveCalendar } from './pages/leave/leave-calendar/leave-calendar.component';
import { StudentsPage } from './pages/user-directory/students/students.component';
import { modules, profileDefaults, CampusModule } from './data/catalog';

@Component({selector:'app-root', imports:[NgComponentOutlet, ChangePassword, SignedOut, DashboardPage, SettingsCampusProfilePage, MachineConsole, StudentsPage, LeaveCalendar], templateUrl:'./app.component.html'})
export class CampusApp {
  accountName = accountName;
  accountEmail = accountEmail;
  initials = initials;
  signedOut = false;
  accountLinks: { name: string; slug: string; icon: string; hint: string; component: Type<unknown> }[] = [
    {name:'My Profile', slug:'my-profile', icon:'user', hint:'Profile and account details', component:MyProfile},
    {name:'Student Desk', slug:'student-desk', icon:'graduation-cap', hint:'Your records, requests and approvals', component:StudentDesk},
    {name:'Change Password', slug:'change-password', icon:'lock', hint:'Update your credentials', component:ChangePassword}
  ];
  accountPage?: typeof this.accountLinks[number];
  passwordOpen = false;
  previousScreen = '#/dashboard';
  dismissAccountOutside(menu: HTMLDetailsElement, target: EventTarget | null) {
    if (target instanceof Node && !menu.contains(target)) menu.open = false;
  }
  logout() {
    sessionStorage.setItem('campus.signedOut','1');
    location.hash = '/account/signed-out';
  }
  modules = modules;
  current = modules[0];
  section = '';
  mobile = false;
  flyout?: HTMLElement;
  closeTimer?: ReturnType<typeof setTimeout>;
  cancelClose(){clearTimeout(this.closeTimer);}
  closeFlyout(){this.cancelClose();this.flyout?.hidePopover();this.flyout=undefined;}
  leaveFlyout(){
    if(this.mobile)return;
    this.cancelClose();
    this.closeTimer=setTimeout(()=>this.closeFlyout(),220);
  }
  selectScreen(event:MouseEvent,hash:string){
    if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
    event.preventDefault();
    location.hash=hash;
    this.closeFlyout();
    this.mobile=false;
  }
  openFlyout(trigger:HTMLElement,panel:HTMLElement){
    this.cancelClose();
    if(this.flyout!==panel){this.closeFlyout();panel.showPopover();this.flyout=panel;}
    const sidebar=trigger.closest('aside')!.getBoundingClientRect();
    panel.style.setProperty('--sidebar-edge',sidebar.right+'px');
    panel.style.setProperty('--sidebar-top',sidebar.top+'px');
    panel.style.setProperty('--sidebar-height',sidebar.height+'px');
  }
  hoverFlyout(trigger:HTMLElement,panel:HTMLElement){
    if(matchMedia('(hover:hover) and (min-width:1200px)').matches)this.openFlyout(trigger,panel);
  }
  toggleFlyout(trigger:HTMLElement,panel:HTMLElement){this.openFlyout(trigger,panel);panel.querySelector('a')?.focus();}
  @HostListener('document:keydown.escape') dismissMenu(){const trigger=this.flyout?.previousElementSibling as HTMLElement|undefined;this.closeFlyout();trigger?.focus();}
  @HostListener('window:resize') resizeMenu(){this.closeFlyout();}
  @HostListener('document:pointerdown',['$event']) outsideMenu(event:PointerEvent){
    if(this.flyout && !(event.target as Element).closest('.flyout-item'))this.closeFlyout();
  }
  menuGroups = menuGroups;
  menuIcons = menuIcons;
  collapsed = false;
  query = '';
  tab = 'Biometric Machines';
  hardwareTabs = ['Biometric Machines','Enrolled Users','Bulk Enrollment','Backup & Restore'];
  leaveViews = ['Monthly view','Yearly view','Holiday Setup'];
  leaveView = this.leaveViews[0];
  profile: Record<string,string> = {...profileDefaults};
  constructor() {
    try { Object.assign(this.profile,JSON.parse(localStorage.getItem('campus.profile') || '{}')); } catch {}
    document.documentElement.dataset['theme'] = localStorage.getItem('theme') || 'light';
    this.readRoute();
  }
  slug(s:string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''); }
  link(m:CampusModule,section = m.sections[0] || '') {
    return '#/'+[this.slug(m.name),this.slug(section)].filter(Boolean).join('/');
  }
  moduleLink = (name:string) => {return this.link(modules.find(m=>m.name===name) || modules[0]);}
  @HostListener('window:hashchange') readRoute() {
    this.closeFlyout();
    document.querySelector<HTMLDetailsElement>('.account-menu')?.removeAttribute('open');
    const [name,section,subsection] = location.hash.slice(2).split('/');
    this.signedOut = sessionStorage.getItem('campus.signedOut') === '1';
    this.passwordOpen = !this.signedOut && name==='account' && section==='change-password';
    if(this.passwordOpen){
      document.title='Change Password · CampusTrack';
      return;
    }
    this.previousScreen=location.hash || '#/dashboard';
    this.accountPage = name === 'account' ? this.accountLinks.find(item => item.slug === section) : undefined;
    this.current = modules.find(m=>this.slug(m.name)===name) || modules[0];
    this.section = this.current.sections.find(s=>this.slug(s)===section) || this.current.sections[0] || '';
    this.query = ''; this.mobile = false;
    this.tab=this.hardwareTabs.find(item=>this.slug(item)===subsection) || this.hardwareTabs[0];
    this.leaveView=this.leaveViews.find(item=>this.slug(item)===subsection) || this.leaveViews[0];
    document.title = [this.signedOut ? 'Signed out' : this.accountPage?.name || this.section || this.current.name,'CampusTrack'].join(' · ');
  }
  toggleMenu(){this.closeFlyout();if(innerWidth <1200) this.mobile=!this.mobile; else this.collapsed=!this.collapsed;}
  closePassword(){location.hash=this.previousScreen;}
  toggleTheme(){const theme=document.documentElement.dataset['theme']==='dark'?'light':'dark';document.documentElement.dataset['theme']=theme;localStorage.setItem('theme',theme);}
  get pageComponent(){return pages[this.current.name]?.[this.section];}
  get first(){return this.section===this.current.sections[0];}
}

import {User, UserDraft} from "./action";

export function isStaff(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => ['admin','editor','seller'].includes(r.title));
}
export function isAdmin(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'admin');
}
export function isEditor(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'editor');
}
export function isJudge(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'judge');
}
export function isPartner(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'partner');
}
export function isSeller(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'seller');
}
export function isReader(user: User): boolean {
  return  user && user.roles && user.roles.find((r: any) => r.title === 'reader');
}
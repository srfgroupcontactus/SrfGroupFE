export interface IUpdatePassword {
  currentPassword?: string | "";
  newPassword?: string | "";
}

export const defaultValue: Readonly<IUpdatePassword> = {};

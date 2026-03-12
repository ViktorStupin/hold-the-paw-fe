export const USER_ROLE = {
  shelter: "shelter",
  personal: "personal",
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const ROLE_OPTIONS = Object.values(USER_ROLE) as TUserRole[];
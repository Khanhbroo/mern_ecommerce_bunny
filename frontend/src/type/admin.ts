export type UserManagement = {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "customer";
};

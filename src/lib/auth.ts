import { User, Role } from "./types";
import users from "./data/users.json";

// Mock users with passwords for authentication
export const mockUsers = [
  {
    id: "user_1",
    name: "Alex Davis",
    email: "admin@baalvion.com",
    password: "admin123",
    role: "ADMIN" as Role,
    imageId: "user-alex-davis",
  },
  {
    id: "user_2",
    name: "Priya Sharma",
    email: "cofounder@baalvion.com",
    password: "cofounder123",
    role: "CO_FOUNDER" as Role,
    imageId: "user-priya-sharma",
  },
  {
    id: "user_3",
    name: "John Smith",
    email: "investor@baalvion.com",
    password: "investor123",
    role: "INVESTOR" as Role,
    imageId: "user-john-smith",
  },
  {
    id: "user_4",
    name: "Li Wei",
    email: "employee@baalvion.com",
    password: "employee123",
    role: "EMPLOYEE" as Role,
    imageId: "user-li-wei",
  },
];

export interface AuthUser extends User {
  password: string;
}

export const authenticateUser = (
  email: string,
  password: string
): AuthUser | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("userRole", user.role);
};

export const logout = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("currentUser");
  localStorage.removeItem("userRole");
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getUserRole = (): Role | null => {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole");
  return (role as Role) || null;
};

export const hasRole = (requiredRole: Role): boolean => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};

export const hasAnyRole = (roles: Role[]): boolean => {
  const userRole = getUserRole();
  return userRole ? roles.includes(userRole) : false;
};

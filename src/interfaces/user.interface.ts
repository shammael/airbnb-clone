import { User } from "@prisma/client";

type TUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified">;

export default TUser;

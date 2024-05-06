import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    if (isExistSuperAdmin) {
      console.log("Super Admin Already Exist");
      return;
    }

    const hashedPassword: string = await bcrypt.hash("super@admin.com", 12);

    const superAdmin = await prisma.user.create({
      data: {
        email: "super@admin.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            // email: "super@admin.com",
            // role: UserRole.SUPER_ADMIN,
            contactNumber: "1234567890",
          },
        },
      },
    });

    console.log("Super Admin Created Successfully", superAdmin);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();

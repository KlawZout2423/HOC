import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding system permissions...");
  const permissions = [
    { code: "READ_CASES", description: "View cases and records" },
    { code: "WRITE_CASES", description: "Add and update cases and files" },
    { code: "APPROVE_JUDGMENT", description: "Record and approve judgments" },
    { code: "MANAGE_USERS", description: "Manage system staff and roles" },
  ];

  const dbPermissions = {};
  for (const perm of permissions) {
    dbPermissions[perm.code] = await prisma.permission.upsert({
      where: { code: perm.code },
      update: {},
      create: perm,
    });
  }

  console.log("Seeding system roles...");
  const adminRole = await prisma.role.upsert({
    where: { name: "Administrator" },
    update: {
      permissions: {
        set: Object.values(dbPermissions).map((p) => ({ id: p.id })),
      },
    },
    create: {
      name: "Administrator",
      description: "System-wide Administrator with full permissions",
      permissions: {
        connect: Object.values(dbPermissions).map((p) => ({ id: p.id })),
      },
    },
  });

  const registrarRole = await prisma.role.upsert({
    where: { name: "Registrar" },
    update: {
      permissions: {
        set: [
          { id: dbPermissions["READ_CASES"].id },
          { id: dbPermissions["WRITE_CASES"].id },
        ],
      },
    },
    create: {
      name: "Registrar",
      description: "Registry officer managing cases and uploads",
      permissions: {
        connect: [
          { id: dbPermissions["READ_CASES"].id },
          { id: dbPermissions["WRITE_CASES"].id },
        ],
      },
    },
  });

  const panelRole = await prisma.role.upsert({
    where: { name: "Panel Member" },
    update: {
      permissions: {
        set: [
          { id: dbPermissions["READ_CASES"].id },
          { id: dbPermissions["APPROVE_JUDGMENT"].id },
        ],
      },
    },
    create: {
      name: "Panel Member",
      description: "Judicial panel members presiding over disputes",
      permissions: {
        connect: [
          { id: dbPermissions["READ_CASES"].id },
          { id: dbPermissions["APPROVE_JUDGMENT"].id },
        ],
      },
    },
  });

  console.log("Seeding default administrator user...");
  await prisma.user.upsert({
    where: { email: "admin@vrhc.gov.gh" },
    update: {
      roleId: adminRole.id,
    },
    create: {
      email: "admin@vrhc.gov.gh",
      password: "adminpassword",
      roleId: adminRole.id,
    },
  });

  console.log("Seeding Volta Region districts...");
  const ho = await prisma.district.upsert({
    where: { name: "Ho Municipal" },
    update: {},
    create: { name: "Ho Municipal" },
  });

  const kpando = await prisma.district.upsert({
    where: { name: "Kpando Municipal" },
    update: {},
    create: { name: "Kpando Municipal" },
  });

  const hohoe = await prisma.district.upsert({
    where: { name: "Hohoe Municipal" },
    update: {},
    create: { name: "Hohoe Municipal" },
  });

  console.log("Seeding Volta Region traditional areas...");
  await prisma.traditionalArea.upsert({
    where: { name: "Awudome" },
    update: { districtId: ho.id },
    create: { name: "Awudome", districtId: ho.id },
  });

  await prisma.traditionalArea.upsert({
    where: { name: "Anfoega" },
    update: { districtId: kpando.id },
    create: { name: "Anfoega", districtId: kpando.id },
  });

  await prisma.traditionalArea.upsert({
    where: { name: "Gbi" },
    update: { districtId: hohoe.id },
    create: { name: "Gbi", districtId: hohoe.id },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

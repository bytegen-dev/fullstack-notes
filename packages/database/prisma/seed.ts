// Load .env file FIRST before importing anything that needs DATABASE_URL
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load .env file from the web app directory
config({ path: resolve(__dirname, "../../../apps/web/.env") });

// Now dynamically import Prisma client and Better Auth after env is loaded
const { default: prisma } = await import("../src/client.js");
const { betterAuth } = await import("better-auth");
const { prismaAdapter } = await import("better-auth/adapters/prisma");

// Create Better Auth instance to use its signup API
const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false, // We don't need auto sign-in for seeding
  },
});

const sampleTitles = [
  "Meeting Notes",
  "Project Ideas",
  "Shopping List",
  "Daily Reminders",
  "Code Snippets",
  "Book Recommendations",
  "Travel Plans",
  "Recipe Collection",
  "Learning Goals",
  "Workout Routine",
  "Budget Planning",
  "Movie Watchlist",
  "Important Dates",
  "Quick Thoughts",
  "Research Notes",
];

const sampleContent = [
  "This is a sample note with some content.",
  "Here are some important points to remember.",
  "Don't forget to follow up on this.",
  "This needs more research and investigation.",
  "A quick reminder for later reference.",
  "Some interesting ideas worth exploring further.",
  "Notes from today's session.",
  "Key takeaways from the discussion.",
  "Action items to complete this week.",
  "Random thoughts and observations.",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

function generateRandomContent(): string {
  const sentences = Math.floor(Math.random() * 3) + 2; // 2-4 sentences
  let content = "";
  for (let i = 0; i < sentences; i++) {
    content += getRandomItem(sampleContent);
    if (i < sentences - 1) {
      content += " ";
    }
  }
  return content;
}

async function main() {
  console.log("🌱 Starting database seed...");

  const testEmail = "test@example.com";
  const testPassword = "password123";

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email: testEmail },
  });

  let user;

  if (existingUser) {
    console.log(
      "👤 Test user already exists, deleting to recreate with Better Auth...",
    );
    // Delete existing user (cascade will delete account and notes)
    await prisma.user.delete({
      where: { id: existingUser.id },
    });
  }

  // Use Better Auth's signup API to create the user with password
  // This ensures the password is hashed correctly in the format Better Auth expects
  console.log("🔐 Creating test user with Better Auth signup API...");
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: testEmail,
        password: testPassword,
        name: "Test User",
      },
    });

    // Get the created user from the result
    user = result.user;

    if (!user) {
      throw new Error("User was not created");
    }

    console.log("✅ Test user created successfully!");
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
  } catch (error) {
    console.error("❌ Error creating user with Better Auth:", error);
    throw error;
  }

  // Delete existing notes for this user (to avoid duplicates on re-seed)
  const existingNotesCount = await prisma.note.count({
    where: { userId: user.id },
  });

  if (existingNotesCount > 0) {
    console.log(`🗑️  Deleting ${existingNotesCount} existing notes...`);
    await prisma.note.deleteMany({
      where: { userId: user.id },
    });
  }

  console.log(`📝 Creating 50 notes for user: ${user.email}...`);

  // Create 50 notes
  for (let i = 0; i < 50; i++) {
    await prisma.note.create({
      data: {
        title: `${getRandomItem(sampleTitles)} ${i + 1}`,
        content: generateRandomContent(),
        userId: user.id,
      },
    });
  }

  const noteCount = await prisma.note.count({
    where: { userId: user.id },
  });

  console.log(`✅ Successfully created ${noteCount} notes!`);
  console.log(`📊 Database seeded successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

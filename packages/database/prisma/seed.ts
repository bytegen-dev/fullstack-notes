// Load .env file FIRST before importing anything that needs DATABASE_URL
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load .env file from the web app directory
config({ path: resolve(__dirname, "../../../apps/web/.env") });

// Now dynamically import Prisma client after env is loaded
const { default: prisma } = await import("../src/client.js");

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

  // Find or create a test user
  let user = await prisma.user.findFirst({
    where: { email: testEmail },
  });

  if (!user) {
    console.log("👤 Creating test user...");
    user = await prisma.user.create({
      data: {
        email: testEmail,
        name: "Test User",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Check if account exists, if not create one with password
  const existingAccount = await prisma.account.findFirst({
    where: {
      userId: user.id,
      providerId: "credential",
    },
  });

  if (!existingAccount) {
    console.log("🔐 Creating password account...");
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    await prisma.account.create({
      data: {
        id: randomUUID(),
        accountId: testEmail,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("✅ Password account created!");
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
  } else {
    console.log("🔐 Password account already exists, updating password...");
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });
    console.log("✅ Password updated!");
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
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

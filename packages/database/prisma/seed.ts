import { PrismaClient } from "../src/generated/prisma/client.js";
import prisma from "../src/client.js";

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

  // Find or create a test user
  let user = await prisma.user.findFirst({
    where: { email: "test@example.com" },
  });

  if (!user) {
    console.log("👤 Creating test user...");
    user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

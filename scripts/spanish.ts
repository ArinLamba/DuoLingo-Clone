import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const getAssetPath = (file: string) =>
  `/courses/spanish/unit-1/lesson-1/${file}`;

const main = async () => {
  try {
    console.log("🌱 Seeding database...");

    // Clear previous data
    // await Promise.all([
    //   db.delete(schema.userProgress),
    //   db.delete(schema.challengeOptions),
    //   db.delete(schema.challenges),
    //   db.delete(schema.lessons),
    //   db.delete(schema.units),
    //   db.delete(schema.courses),
    //   db.delete(schema.userSubscription),
    // ]);

    // Insert course
    const [course] = await db
      .insert(schema.courses)
      .values({ title: "Spanish", imageSrc: "/assets/flags/es.svg" })
      .returning();

    // Insert units
    const units = await db
      .insert(schema.units)
      .values([
        {
          courseId: course.id,
          title: "Unit 1",
          description: "Learn the basics of Spanish",
          order: 1,
        },
        {
          courseId: course.id,
          title: "Unit 2",
          description: "Learn intermediate Spanish",
          order: 2,
        },
      ])
      .returning();

    for (const unit of units) {
      // Insert lessons
      const lessons = await db
        .insert(schema.lessons)
        .values([
          { unitId: unit.id, title: "Nouns", order: 1 },
          { unitId: unit.id, title: "Verbs", order: 2 },
          { unitId: unit.id, title: "Adjectives", order: 3 },
          { unitId: unit.id, title: "Phrases", order: 4 },
          { unitId: unit.id, title: "Sentences", order: 5 },
        ])
        .returning();

      for (const lesson of lessons) {
        const challenges: typeof schema.challenges.$inferInsert[] = [
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the man"?',
            order: 1,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the woman"?',
            order: 2,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the boy"?',
            order: 3,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: '"the man"',
            order: 4,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the zombie"?',
            order: 5,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the robot"?',
            order: 6,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: 'Which one of these is "the girl"?',
            order: 7,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: '"the zombie"',
            order: 8,
          },
        ];

        for (const challengeData of challenges) {
          const [challenge] = await db
            .insert(schema.challenges)
            .values(challengeData)
            .returning();

          const options = getOptionsForChallenge(challenge.order, challenge.id);
          if (options.length > 0) {
            await db.insert(schema.challengeOptions).values(options);
          }
        }
      }
    }

    console.log("✅ Database seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw new Error("Failed to seed database");
  }
};

const getOptionsForChallenge = (order: number, challengeId: number) => {
  switch (order) {
    case 1:
      return [
        {
          challengeId,
          correct: true,
          text: "el hombre",
          imageSrc: getAssetPath("man.svg"),
          audioSrc: getAssetPath("es_man.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "la mujer",
          imageSrc: getAssetPath("woman.svg"),
          audioSrc: getAssetPath("es_woman.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el niño",
          imageSrc: getAssetPath("boy.svg"),
          audioSrc: getAssetPath("es_boy.mp3"),
        },
      ];

    case 2:
      return [
        {
          challengeId,
          correct: true,
          text: "la mujer",
          imageSrc: getAssetPath("woman.svg"),
          audioSrc: getAssetPath("es_woman.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el niño",
          imageSrc: getAssetPath("boy.svg"),
          audioSrc: getAssetPath("es_boy.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el hombre",
          imageSrc: getAssetPath("man.svg"),
          audioSrc: getAssetPath("es_man.mp3"),
        },
      ];

    case 3:
      return [
        {
          challengeId,
          correct: true,
          text: "el niño",
          imageSrc: getAssetPath("boy.svg"),
          audioSrc: getAssetPath("es_boy.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "la mujer",
          imageSrc: getAssetPath("woman.svg"),
          audioSrc: getAssetPath("es_woman.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el hombre",
          imageSrc: getAssetPath("man.svg"),
          audioSrc: getAssetPath("es_man.mp3"),
        },
      ];

    case 4:
      return [
        {
          challengeId,
          correct: true,
          text: "el hombre",
          audioSrc: getAssetPath("es_man.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "la mujer",
          audioSrc: getAssetPath("es_woman.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el niño",
          audioSrc: getAssetPath("es_boy.mp3"),
        },
      ];

    case 5:
      return [
        {
          challengeId,
          correct: true,
          text: "el zombie",
          imageSrc: getAssetPath("zombie.svg"),
          audioSrc: getAssetPath("es_zombie.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el hombre",
          imageSrc: getAssetPath("man.svg"),
          audioSrc: getAssetPath("es_man.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "la mujer",
          imageSrc: getAssetPath("woman.svg"),
          audioSrc: getAssetPath("es_woman.mp3"),
        },
      ];

    case 6:
      return [
        {
          challengeId,
          correct: true,
          text: "el robot",
          imageSrc: getAssetPath("robot.svg"),
          audioSrc: getAssetPath("es_robot.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el zombie",
          imageSrc: getAssetPath("zombie.svg"),
          audioSrc: getAssetPath("es_zombie.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el niño",
          imageSrc: getAssetPath("boy.svg"),
          audioSrc: getAssetPath("es_boy.mp3"),
        },
      ];

    case 7:
      return [
        {
          challengeId,
          correct: true,
          text: "la niña",
          imageSrc: getAssetPath("girl.svg"),
          audioSrc: getAssetPath("es_girl.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el zombie",
          imageSrc: getAssetPath("zombie.svg"),
          audioSrc: getAssetPath("es_zombie.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el hombre",
          imageSrc: getAssetPath("man.svg"),
          audioSrc: getAssetPath("es_man.mp3"),
        },
      ];

    case 8:
      return [
        {
          challengeId,
          correct: true,
          text: "el zombie",
          audioSrc: getAssetPath("es_zombie.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "la mujer",
          audioSrc: getAssetPath("es_woman.mp3"),
        },
        {
          challengeId,
          correct: false,
          text: "el niño",
          audioSrc: getAssetPath("es_boy.mp3"),
        },
      ];

    default:
      return [];
  }
};

void main();

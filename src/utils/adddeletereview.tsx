"use server";

import { z } from "zod";
import prisma, { ReviewType } from "./db";
import { revalidatePath } from "next/cache";

export async function addReview(_prevState: any, formData: FormData) {
  const schema = z.object({
    lecturerTag: z.string().min(1).max(10),
    authorId: z.string(),
    reviews: z.array(z.coerce.number().int().positive()),
    kelas: z
      .string()
      .regex(
        RegExp("[A-Z]{3}[0-9]{4}"),
        "Course code must be in full caps. Check your digits.",
      ),
    comments: z.string().optional(),
  });

  const [tag, authorId, kelas, comments] = [
    "tag",
    "authorId",
    "kelas",
    "comments",
  ].map((i) => formData.get(i));

  const RUBRICS = ["Teaching", "Assessments", "Guidance", "Reach"];
  const reviews = RUBRICS.map((i) => formData.get(i));

  try {
    const data = schema.parse({
      lecturerTag: tag,
      authorId: authorId,
      reviews: reviews,
      kelas: kelas,
      comments: comments,
    });
    await prisma.review.create({ data: data });
    revalidatePath("/" + tag);
    return { message: ["Added!"], success: true };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        message: ["Error:", ...e.errors.map((r) => r.message)],
        success: false,
      };
    }
    console.log(e);
    return { message: ["Error"], success: false };
  }
}

export async function deleteReview(review: ReviewType) {
  await prisma.review.delete({ where: { id: review.id } });
  revalidatePath("/" + review.lecturerTag);
  return;
}

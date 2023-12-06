"use server";

import { z } from "zod";
import prisma, { ReviewType } from "./db";
import { revalidatePath } from "next/cache";
import { filterExtreme } from "./getreviews";

export async function addReview(_prevState: any, formData: FormData) {
  const schema = z.object({
    lecturerTag: z.string().min(1).max(10),
    authorId: z.coerce.bigint(),
    reviews: z.array(z.coerce.number().int().positive()),
    kelas: z
      .string()
      .regex(
        RegExp("[A-Z]{3}[0-9]{4}"),
        "Course code must be in full caps. Check your digits."
      ),
    comments: z.string().max(250).optional(),
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
    const prevRevs = await prisma.review.findMany({
      where: { authorId: data.authorId, lecturerTag: data.lecturerTag },
      select: { kelas: true },
    });
    if (prevRevs.map((r) => r.kelas).includes(data.kelas)) {
      throw Error(
        "You have already reviewed this class. " +
          "Delete your previous review to submit a new one."
      );
    }
    if (!filterExtreme(data))
      throw Error(
        "Full reviews require a comment. " +
          "This is to ensure helpful reviews."
      );

    await prisma.review.create({ data: data });
    revalidatePath("/" + tag);
    return { message: ["Added!"], success: true };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        message: [...e.errors.map((r) => r.message)],
        success: false,
      };
    }
    if (e instanceof Error) {
      return { message: [e.message], success: false };
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

"use server";
import { z } from "zod";
import prisma from "./db";
import { revalidatePath } from "next/cache";
export async function addReviewDB(_prevState: any, formData: FormData) {
  const schema = z.object({
    lecturerTag: z.string().min(3).max(15),
    assignments: z.coerce.number().int().positive(),
    teaching: z.coerce.number().int().positive(),
    kelas: z
      .string()
      .regex(
        RegExp("[A-Z]{3}[0-9]{4}"),
        "Course code must be in full caps. Check your digits.",
      ),
    comments: z.string().optional(),
  });

  try {
    const data = schema.parse({
      lecturerTag: formData.get("lecturerTag"),
      assignments: formData.get("assignments"),
      teaching: formData.get("teaching"),
      kelas: formData.get("kelas"),
      comments: formData.get("comments"),
    });
    await prisma.review.create({ data: data }).then((v) => {
      prisma.$disconnect;
      return v;
    });
    revalidatePath("/" + data.lecturerTag);
    return { message: "Added!", success: true };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        message: "Error: " + e.errors.map((r) => r.message).join("\n"),
        success: false,
      };
    }
    return { message: "Error: " + e, success: false };
  }
}

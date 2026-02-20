import { ZodError, type ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodObject<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.parseAsync({ body: req.body });

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",

          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

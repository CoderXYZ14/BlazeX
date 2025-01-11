import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      res.status(err.code || 500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
  };

export { asyncHandler };

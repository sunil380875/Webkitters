import { Application, NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";

class BottomMiddleware {
  constructor(app: Application) {
    app.use(this.routeNotFoundErrorHandler);
    app.use(this.fromRouteErrorHandler);
  }
  public routeNotFoundErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(new NotFound("No route found, Please check your urls."));
  }
  public fromRouteErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(err.status || 500);

    const errorMessage = err?.meta?.cause
      ? err?.meta?.cause
      : err?.message || "Something went wrong";

    res.json({
      error: {
        message: errorMessage,
      },
    });
  }
}

export default BottomMiddleware;

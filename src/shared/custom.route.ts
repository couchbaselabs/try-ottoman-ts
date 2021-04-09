export abstract class CustomRoute {
  initRoutes() {
    this.getAll();
    this.getById();
    this.post();
    this.patch();
    this.put();
    this.delete();
  }

  abstract getAll(): void;

  abstract getById(): void;

  abstract post(): void;

  abstract patch(): void;

  abstract put(): void;

  abstract delete(): void;
}

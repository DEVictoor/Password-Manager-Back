import express, { Application as ExApplication, Handler } from "express";
import { controllers } from "./modules//index";
import morgan from "morgan";
import { Metadata as MetadataKeys } from "./enums/Controller.enum";
import { ConectionPgsql } from "./database/conection";
import { Router } from "./interfaces/router.interface";
import cors from "cors";

class Application {
  private readonly _instance: ExApplication;
  private info: Array<{ api: string; handle: string }> = [];

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this._instance.use("/public", express.static("assets"));
    this._instance.use(cors({ origin: "*" }));
    this._instance.use(morgan("tiny"));

    // Conection to postgresql
    ConectionPgsql.initialize()
      .then(async () => {
        console.log("DB connected");
      })
      .catch((err) => {
        console.log("DB not connected");
        console.log(err);
      });

    this.registerRouters();

    this.printMemoryUsage();
  }

  private printMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script use aproximately ${Math.round(used * 100) / 100} MB`
    );
  }

  private registerRouters() {
    this._instance.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    controllers.forEach((controllerclass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerclass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerclass
      );

      const routers: Router[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerclass
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLE, controllerclass) || [];

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,
          middlewares,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        this.info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handle: `${controllerclass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    this.printConsole();
  }

  private printConsole() {
    console.clear();
    console.table(this.info);
  }
}

export default new Application();

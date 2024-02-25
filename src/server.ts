import Application from "./application";
import KubernetesApplication from "@/core/kubernetes-application";

const port: string = process.env.PORT ?? '8080';

const expressServer = Application.start(port);

KubernetesApplication.start(expressServer);

import {createLightship} from "lightship";
import http from "http";

class KubernetesApplication {
    public start(expressServer: http.Server) {
        const lightship = createLightship({
            port: 5001,
            detectKubernetes: true,
        });

        expressServer.addListener('listening', () => {
            lightship.signalReady();
        });

        lightship.registerShutdownHandler(() => {
            expressServer.close();
        });
    }
}

export default new KubernetesApplication();

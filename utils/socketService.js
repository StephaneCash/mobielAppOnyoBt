import io from "socket.io-client";
import { baseUrlSocket } from "../bases/basesUrl";

class WSService {
    initializeSocket = async () => {
        try {
            this.socket = io(baseUrlSocket, {
                transports: ['websocket']
            });

            console.log("Initialize socket ");

            this.socket.on('connect', (data) => {
                console.log("Socket connected", data);
            });

            this.socket.on('disconnect', (data) => {
                console.log("Socket disconnect");
            })

            this.socket.on('error', (data) => {
                console.log("Socket Error");
            })
        } catch (error) {
            console.log("L'erreur de socket io non initialisé ", error)
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data);
    }

    on(event, cb) {
        this.socket.on(event, cb);
    }

    removeListener(listerName) {
        this.socket.removeListener(listerName);
    }
}

const socketService = new WSService();

export default socketService;
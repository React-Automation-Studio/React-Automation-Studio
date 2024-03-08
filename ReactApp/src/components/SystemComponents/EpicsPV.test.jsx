import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react';

import { createServer }  from 'node:http';
import { Server } from 'socket.io';
import io from 'socket.io-client';

import RasAppCore from './RasAppCore';
import EpicsPV from "./EpicsPV";

vi.mock("./RasAppCore");

const waitFor = (socket, event) => {
    return new Promise((resolve) => {
      socket.once(event, resolve);
    });
}

/**
 * @vitest-environment jsdom
 */
describe("EpicsPV component", () => {
    let httpServer = null;
    let ioServer = null;
    
    beforeEach(() => {
        httpServer = createServer();
        ioServer = new Server(httpServer);
    });
    
    afterEach(() => {
        if (ioServer) {
            ioServer.close();        
            ioServer = null;
        }
        if (httpServer) {
            httpServer.close();
        }
    });
    
    test('request_pv_info is sent when mounted with makeNewSocketIoConnection', () => {
        return (new Promise((resolve) => {
            httpServer.listen(() => {
                const port = httpServer.address().port;
                
                ioServer.on("connection", (socket) => {
                    resolve(socket);
                });
                
                render(
                    <RasAppCore pvServerUrl={`http://localhost:${port}`}>
                        <EpicsPV pv="mypv" makeNewSocketIoConnection />
                    </RasAppCore>
                );                
            });
        }))
        .then((serverSocket) => {
            return waitFor(serverSocket, "request_pv_info")
        })
        .then(({data}) => {
            expect(data).toBe("mypv");
        });
    });
    
    test('request_pv_info is sent once socket is available when no makeNewSocketIoConnection is used', () => {
        return (new Promise((resolve) => {
            httpServer.listen(() => {
                const port = httpServer.address().port;
                                
                ioServer.on("connection", (socket) => {
                    resolve(socket);
                });
                
                const socket = io(`http://localhost:${port}`);                                
                render(
                    <RasAppCore socket={socket}>
                        <EpicsPV pv="mypv" makeNewSocketIoConnection={false} />
                    </RasAppCore>
                );                
            });
        }))
        .then((serverSocket) => {
            return waitFor(serverSocket, "request_pv_info")
        })
        .then(({data}) => {
            expect(data).toBe("mypv");
        });
    });    

    test('request_pv_info is sent when socket is not available and no makeNewSocketIoConnection is used', () => {
        return new Promise((resolve) => {
            httpServer.listen(() => {                                
                ioServer.on("connection", () => {
                    throw new Error("Connection received");
                });
                
                setTimeout(resolve, 2000);
                
                render(
                    <RasAppCore>
                        <EpicsPV pv="mypv" makeNewSocketIoConnection={false} />
                    </RasAppCore>
                );                
            });
        });
    });    
});


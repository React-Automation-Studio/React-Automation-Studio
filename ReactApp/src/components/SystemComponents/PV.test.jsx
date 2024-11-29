import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react';

import { createServer }  from 'node:http';
import { Server } from 'socket.io';
import io from 'socket.io-client';

import RasAppCore from './RasAppCore';
import PV from "./PV";

vi.mock("./RasAppCore");

const waitFor = (socket, event) => {
    return new Promise((resolve) => {
      socket.once(event, resolve);
    });
}

/**
 * @vitest-environment jsdom
 */
describe("PV component", () => {
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
    
    test('request_pv_info is sent once socket is available', () => {
        return (new Promise((resolve) => {
            httpServer.listen(() => {
                const port = httpServer.address().port;
                                
                ioServer.on("connection", (socket) => {
                    resolve(socket);
                });
                
                const socket = io(`http://localhost:${port}`);                                
                render(
                    <RasAppCore socket={socket}>
                        <PV pv="mypv" />
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
});


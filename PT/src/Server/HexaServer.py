# -*- coding: utf-8 -*-
import os
import sys
import getopt
import threading
from Server import *
from Control import *


class HexaServer:
    def __init__(self):
        print("INIT")
        self.start_tcp = True
        self.server = Server()
        self.started = False
        self.video = None
        self.instruction = None
        self.parse_opt()

        if self.start_tcp:
            self.on_server()

    def parse_opt(self):
        self.opts, self.args = getopt.getopt(sys.argv[1:], "tn")
        for o, a in self.opts:
            if o == '-t':
                print("Open TCP")
                self.start_tcp = True

    def on_server(self):
        if not self.started:
            self.server.turn_on_server()
            self.server.tcp_flag = True
            self.video = threading.Thread(target=self.server.transmission_video)
            self.video.start()
            self.instruction = threading.Thread(target=self.server.receive_instruction)
            self.instruction.start()
            self.started = True
            print("Server started.")

    def off_server(self):
        if self.started:
            self.server.tcp_flag = False
            try:
                if self.video:
                    stop_thread(self.video)
                if self.instruction:
                    stop_thread(self.instruction)
            except Exception as e:
                print(f"Error stopping threads: {e}")
            self.server.turn_off_server()
            self.started = False
            print("Server stopped.")

    def toggle_server(self):
        if self.started:
            self.off_server()
        else:
            self.on_server()

    def close_event(self, event=None):
        try:
            if self.video:
                stop_thread(self.video)
            if self.instruction:
                stop_thread(self.instruction)
        except Exception as e:
            print(f"Error during cleanup: {e}")
        try:
            self.server.server_socket.shutdown(2)
            self.server.server_socket1.shutdown(2)
            self.server.turn_off_server()
        except Exception as e:
            print(f"Error shutting down server: {e}")
        os._exit(0)

if __name__ == '__main__':
    try:
        hexaServer=HexaServer()
        try:
            pass
        except KeyboardInterrupt:
            hexaServer.off_server()
        while True:
            pass
    except KeyboardInterrupt:
            hexaServer.off_server()


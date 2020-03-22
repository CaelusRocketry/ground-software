class Backend(Namespace):

    def init(self, app, socketio):
        self.app = app
        self.socketio = socketio

    def update_heartbeat(self, message):
        print(message)
        self.socketio.emit('heartbeat',  {'data': message})

    def update_sensor_data(self, message):
        print(message)
        self.socketio.emit('update sensor data',  {'data': message})

    def update_value_data(self, message):
        print(message)
        self.socketio.emit('update valve data',  {'data': message})



        






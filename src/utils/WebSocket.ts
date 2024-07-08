class WebSockets {
  private users: { socketId: string; userId: string }[] = [];

  connection(client: any): void {
    // Event fired when the chat room is disconnected
    client.on('disconnect', () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });

    // Add identity of user mapped to the socket id
    client.on('identity', (userId: string) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });

    // Subscribe person to chat & other user as well
    client.on('subscribe', (room: string) => {
      //this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });

    // Mute a chat room
    client.on('unsubscribe', (room: string) => {
      client.leave(room);
    });
  }

  // private subscribeOtherUser(room: string, otherUserId: string): void {
  //   const userSockets = this.users.filter(
  //     (user) => user.userId === otherUserId
  //   );
  //   userSockets.map((userInfo) => {
  //     const socketConn = global.io.sockets.connected(userInfo.socketId);
  //     if (socketConn) {
  //       socketConn.join(room);
  //     }
  //   });
  // }
}

export default new WebSockets();

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      
      const playlistsInfo = await this._playlistsService.getPlaylistInfo(playlistId);
      const songs = await this._playlistsService.getSongsInPlaylist(playlistId);
      const playlist = {
        playlist: {
          id: playlistsInfo.id,
          name: playlistsInfo.name,
          songs,
        },
      }

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;

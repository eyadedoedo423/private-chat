# Private Peer-to-Peer Chat

This is a simple private peer-to-peer chat application you can host on GitHub Pages or any static web host.

## Features

- Real-time direct chat between two users using WebRTC data channels.
- No backend server needed, everything runs client-side in the browser.
- Encrypted peer-to-peer messaging (via WebRTC).
- Simple UI for creating your PeerJS ID and connecting to a friend's peer.

## How to Use

### Uploading

1. Fork or create a new GitHub repository.
2. Upload the `private-peer-chat.html` file to your repository.
3. Enable GitHub Pages in the repository settings (usually from the `main` or `master` branch root or `/docs` folder).
4. Note the GitHub Pages URL of your site.

### Starting a Chat

1. Open the website URL in your browser.
2. In **Your ID**, enter a unique identifier (could be your name or nickname).
3. Click **Create Peer**.
4. Your **Your ID** will display the peer ID you are registered as — share this ID with your friend.
5. Your friend should open the site, choose their own unique ID, and click **Create Peer**.
6. Your friend then types your peer ID (the one you shared) into **Connect to Peer ID** and clicks **Connect**.
7. Once connected, you both can send messages in real time.

### Chatting

- Type your message and press Enter or click the send button.
- Your messages appear aligned to the right; your friend’s messages appear aligned to the left.

## Privacy and Security

- The communication is encrypted by WebRTC.
- Only users who know each other's PeerJS IDs can connect and see messages.
- The app does not store messages; everything is in-browser during your session.
- Browser tabs or refreshes will clear the chat and connection.
- For better security, use unique peer IDs that others will not guess.

## Limitations

- Both users must be online and connected simultaneously for chat to function.
- Network restrictions or firewalls on either side might prevent P2P connection.
- PeerJS uses free signaling servers for connection initiation.
- No message history or persistence.
- Not suitable for large groups; only one-to-one chat.

## Troubleshooting

- If connection cannot be established, try refreshing and recreating your peer IDs.
- Make sure you share exact PeerJS IDs.
- Check browser console for errors.

---

Feel free to customize and host it yourself!

---

*Made with ❤️ for private chats.*# private-chat

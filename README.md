<<<<<<< HEAD
# 🌍 Dynamic Tunnel Sharing from Raspberry Pi

This project is a **self-updating link broadcaster** for a web server hosted on a **Raspberry Pi**. It allows anyone to access your locally-hosted project via the internet, even though you're behind NAT or don’t have a static IP.

Whenever the Raspberry Pi boots or restarts the server:
- It starts the web project (e.g. a Next.js site)
- Exposes it using **Tunnelmole** (a free tunneling service)
- Captures the new temporary public URL (e.g. `https://orange-turtle.tmole.dev`)
- Automatically updates a **GitHub Gist** with that URL
- Optionally logs who accessed the page

This is ideal for **remote sharing**, **on-the-fly demos**, or **dev preview links** — all without manual setup.

---

## 🔧 Technologies Used

| Component      | Description                                               |
|----------------|-----------------------------------------------------------|
| 🧠 **Next.js**  | Web framework hosted on the Raspberry Pi                 |
| 📡 **Tunnelmole** | Creates a public link to your local server             |
| 📜 **Bash Script** | Automates the full flow: run, tunnel, extract, update |
| 🗃️ **GitHub Gist** | Serves as a stable pointer to the ever-changing tunnel |
| 🍓 **Raspberry Pi** | Host machine (runs headlessly or from boot)         |
| 🧾 **User Logging** | Logs every request or access (optional but included) |

---

## 🔁 What Happens Step-by-Step

1. **You run `start_portfolio.sh`** (manually or automatically on boot).
2. The script:
   - Starts your project (`npm run dev`)
   - Launches Tunnelmole on port `3000`
   - Reads the new public URL from Tunnelmole's logs
   - Pushes the updated link to a GitHub Gist (`current-url.txt`)
3. Visitors who access your Gist or your GitHub Pages site will:
   - See the current live link
   - Optionally be redirected or shown a link to click
4. Each visit is optionally **logged to a file** on the Pi for analytics or security.

---

## 🪛 Example Use Case

Let’s say you're building a personal portfolio or game on your Pi and want to share it:

- Run the script
- Send someone your Gist link (e.g., `gist.github.com/yourusername/abc123`)
- They click → see the current live link → access your project
- Meanwhile, the Pi logs the access event

---

## 📍 Bonus

You can:
- Embed this live link into GitHub Pages
- Fetch it via `fetch()` in any frontend
- Track who visited
- Restart safely — the link always stays updated

---

## 💡 Real-World Scenarios

- Share your Raspberry Pi camera stream remotely
- Let friends preview your portfolio while it’s still in development
- Run private servers, accessible only when you turn them on
- Showcase hobby projects without paying for hosting

---

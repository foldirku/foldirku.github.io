---
layout: post
title: "Kontak"
author: "Wildan Hidayat"
permalink: /contact/
---

# Hubungi Kami

Jika kamu memiliki pertanyaan, kritik, saran, atau sekadar ingin menyapa, jangan ragu untuk menghubungi kami melalui salah satu metode berikut:

---

## 📧 Email

Silakan kirim email ke:

**[{{ site.email | default: "namakamu@email.com" }}](mailto:{{ site.email | default: "namakamu@email.com" }})**

---

## 💬 Sosial Media

Ikuti dan hubungi kami melalui:

- 📘 [Facebook](https://facebook.com/namamu)
- 🐦 [Twitter](https://twitter.com/namamu)
- 📸 [Instagram](https://instagram.com/namamu)

> Ganti link di atas dengan akun sosial kamu sendiri.

---

## 📝 Form Kontak (Opsional)

Jika kamu ingin menambahkan form kontak (pakai layanan seperti Formspree), gunakan ini:

```html
<form action="https://formspree.io/f/yourformid" method="POST">
  <label for="name">Nama:</label><br>
  <input type="text" id="name" name="name" required><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="_replyto" required><br><br>

  <label for="message">Pesan:</label><br>
  <textarea id="message" name="message" rows="5" required></textarea><br><br>

  <button type="submit">Kirim</button>
</form>

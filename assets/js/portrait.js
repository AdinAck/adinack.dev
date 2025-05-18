const URLS = [
  "https://cdn.adinack.dev/self-portraits/2537775568083453012.png",
  "https://cdn.adinack.dev/self-portraits/39782253-D15A-454C-BE35-6423D9B79D13.png",
  "https://cdn.adinack.dev/self-portraits/43E5BC64-544A-41FD-9443-18DBC34DDFB4.png",
  "https://cdn.adinack.dev/self-portraits/DC3F7F7B-61F6-40F9-8D3A-724485B579B7.png",
  "https://cdn.adinack.dev/self-portraits/DSCF3386.png",
  "https://cdn.adinack.dev/self-portraits/IMG_0539.png",
  "https://cdn.adinack.dev/self-portraits/IMG_2034.png",
  "https://cdn.adinack.dev/self-portraits/IMG_2266.png",
  "https://cdn.adinack.dev/self-portraits/IMG_2342.png",
  "https://cdn.adinack.dev/self-portraits/IMG_2771.png",
  "https://cdn.adinack.dev/self-portraits/IMG_3480.png",
  "https://cdn.adinack.dev/self-portraits/IMG_3718.png",
  "https://cdn.adinack.dev/self-portraits/IMG_3813.png",
  "https://cdn.adinack.dev/self-portraits/IMG_5312.png",
  "https://cdn.adinack.dev/self-portraits/IMG_5599.png",
  "https://cdn.adinack.dev/self-portraits/IMG_7059.png",
  "https://cdn.adinack.dev/self-portraits/IMG_7418.png",
  "https://cdn.adinack.dev/self-portraits/IMG_8754.png",
];

var img = document.getElementById("portrait");
console.log(img);
img.src = URLS[Math.floor(Math.random() * URLS.length)];

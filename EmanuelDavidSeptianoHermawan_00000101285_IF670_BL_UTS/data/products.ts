const products = [
  {
    id: "1",
    name: "iPhone 17 Pro Max",
    price: 25749000,
    image: "https://images.unsplash.com/photo-1759588071781-2c3ba9128497?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTclMjBwcm98ZW58MHx8MHx8fDA%3D",
    category: "Handphone",
    description: {
      processor: "A19 Pro (3 nm).",
      ram: "12GB",
      storage: "256GB - 2TB",
      camera: "Triple 48MP + zoom sampai 8x",
      battery: "±5000 mAh"
    }
  },
  {
    id: "2",
    name: "iPhone 16 Pro Max",
    price: 20499000,
    image: "https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aVBob25lJTIwMTYlMjBQcm8lMjBNYXh8ZW58MHx8MHx8fDA%3D",
    category: "Handphone",
    description: {
      processor: "A18 Pro",
      ram: "8GB",
      storage: "256GB - 1TB",
      camera: "48MP + 48MP + 12MP (zoom 5x)",
      battery: "±4685mAh"
    }
  },
  {
    id: "3",
    name: "Galaxy S26 Ultra",
    price: 27499000,
    image: "https://images.samsung.com/is/image/samsung/p6pim/id/s2602/gallery/id-galaxy-s26-ultra-s948-sm-s948bzvcxid-thumb-550792474?$Q90_330_330_F_PNG$",
    category: "Handphone",
    description: {
      processor: "Snapdragon 8 Gen 5 Elite",
      ram: "12 / 16GB",
      storage: "256GB - 1TB",
      camera: "200MP + zoom 3x & 5x",
      battery: "5000mAh + fast charging 65W"
    }
  },
  {
    id: "4",
    name: "Xiaomi 15 Ultra",
    price: 16999000,
    image: "https://images.unsplash.com/photo-1774070150575-719b13072230?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8WGlhb21pJTIwMTUlMjBVbHRyYXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Handphone",
    description: {
      processor: "Snapdragon 8 Elite",
      ram: "12GB / 16GB",
      storage: "256GB - 1TB",
      camera: "200MP + 3x 50MP",
      battery: "5410mAh + 90W fast charging"
    }
  },
  {
    id: "5",
    name: "OPPO Find X8 Pro",
    price: 19999000,
    image: "https://opsg-imgcdn-sg.heytapimg.com/epb/202511/21/Dn6fCwiVVfJwXMIJ.png?x-amz-process=image/format,webp/quality,Q_80",
    category: "Handphone",
    description: {
      processor: "Dimensity 9400",
      ram: "12GB / 16GB",
      storage: "512GB",
      camera: "4x 50MP (zoom sampai 6x)",
      battery: "5910mAh + 80W"
    }
  },
  {
    id: "6",
    name: "Red Magic 11 Pro Plus",
    price: 11876569,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8A-FdpBsPIxL2zXmG2N12BIvpbYLw5L8-A&s",
    category: "Handphone",
    description: {
      processor: "Snapdragon 8 Elite Gen 5",
      ram: "12GB - 24GB",
      storage: "256GB - 1TB",
      camera: "50 + 50 + 2MP",
      battery: "7500mAh + 120W"
    }
  },
  {
    id: "7",
    name: "MacBook Pro M5",
    price: 27999000,
    image: "https://images.unsplash.com/photo-1637329428580-8fddec26fa67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2slMjBwcm8lMjBtNXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Laptop",
    description: {
      processor: "M5 / M5 Pro / M5 Max",
      ram: "16GB - 128GB",
      storage: "512GB - 8TB",
      layar: "mini-LED 120Hz",
      battery: "72,4Wh"
    }
  },
  {
    id: "8",
    name: "15-inch MacBook Air",
    price: 19499000,
    image: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fDE1LWluY2glMjBNYWNCb29rJTIwQWlyfGVufDB8fDB8fHww",
    category: "Laptop",
    description: {
      processor: "M3",
      ram: "8GB - 24GB",
      storage: "256GB - 2TB",
      layar: "15,3 inch Liquid Retina",
      battery: "66,5Wh"
    }
  },
  {
    id: "9",
    name: "ThinkPad X1 Carbon Gen 13 Aura Edition",
    price: 42477000,
    image: "https://images.unsplash.com/photo-1763162410742-1d0097cea556?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGhpbmtQYWQlMjBYMSUyMENhcmJvbiUyMEdlbiUyMDEzJTIwQXVyYSUyMEVkaXRpb24lMjAoMTQlQ0ElQkElMjBJbnRlbCl8ZW58MHx8MHx8fDA%3D",
    category: "Laptop",
    description: {
      processor: "Intel Core Ultra (AI-focused)",
      ram: "16 GB / 32 GB LPDDR5X",
      storage: "512 GB - 1 TB - 2 TB",
      layar: "IPS / OLED 2.8K 120Hz",
      battery: "57Wh"
    }
  },
  {
    id: "10",
    name: "ROG Zephyrus G16 (2025) Gu605",
    price: 40999000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrroq0N2FB41taOdFYrkApaRvVnBEFAskr6Q&s",
    category: "Laptop",
    description: {
      processor: "Intel Core Ultra 9 285H",
      ram: "32GB LPDDR5X",
      storage: "1 TB - 2 TB SSD PCIe 4.0",
      layar: "OLED 240Hz",
      battery: "90Wh"
    }
  },
  {
    id: "11",
    name: "Dell XPS 13",
    price: 22899000,
    image: "https://images.unsplash.com/photo-1567521463850-4939134bcd4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGVsbCUyMFhQUyUyMDEzJTIwKDkzNDAlMkY5MzUwJTIwT0xFRCl8ZW58MHx8MHx8fDA%3D",
    category: "Laptop",
    description: {
      processor: "Intel Core Ultra",
      ram: "16GB - 32GB LPDDR5X",
      storage: "512GB - 2TB SSD",
      layar: "13.4” 120Hz / OLED",
      battery: "±55Wh"
    }
  },
  {
    id: "12",
    name: "Acer Swift Go 14 AI",
    price: 13793000,
    image: "https://images.unsplash.com/photo-1636211992838-251a43d72ad2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEFjZXIlMjBTd2lmdCUyMEdvJTIwMTQlMjBBSSUyMENvcGlsb3QlMkIlMjBQQyUyMChTRkcxNC0wMSl8ZW58MHx8MHx8fDA%3D",
    category: "Laptop",
    description: {
      processor: "Snapdragon / Intel Ultra",
      ram: "32GB LPDDR5X",
      storage: "512GB - 2TB SSD",
      layar: "OLED 2K/3K",
      battery: "60Wh"
    }
  },
  {
    id: "13",
    name: "Klipsch T5 II True Wireless",
    price: 1650000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3LusXViGgioGUwQPV6uU6k8OYDqVxAblqQ&s",
    category: "Earphone",
    description: {
      driver: "5 mm dynamic",
      Bluetooth: "aptX supported",
      waterresistance: "IP67",
      fitur: "Transparency Mode, Mic",
      battery: "8 jam"
    }
  },
  {
    id: "14",
    name: "Samsung Galaxy Buds Pro 2",
    price: 2999000,
    image: "https://images.unsplash.com/photo-1600374808258-9b6612195d42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Ftc3VuZyUyMEdhbGF4eSUyMEJ1ZHMlMjBQcm8lMjAyfGVufDB8fDB8fHww",
    category: "Earphone",
    description: {
      driver: "2-way (woofer + tweeter)",
      audio: "24-bit Hi-Fi",
      ANC: "Active Noise Cancelling",
      Mic: "6 microphone",
      battery: "5 jam (ANC ON)",
      bluetooth: "5.3",
      waterresistance: "IPX7"
    }
  },
  {
    id: "15",
    name: "Jabra Elite Series",
    price: 2100000,
    image: "https://images.unsplash.com/photo-1606135185526-1bd767d76d65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFicmElMjBFbGl0ZSUyMFNlcmllc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Earphone",
    description: {
      driver: "6–10 mm dynamic",
      ANC: "Active Noise Cancelling",
      Mic: "6 microphone",
      battery: "hingga 30 jam",
      bluetooth: "5.2 / 5.3 (Multipoint)",
      waterresistance: "IP57 – IP68"
    }
  },
  {
    id: "16",
    name: "Technics EAH-AZ100",
    price: 5097070,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUUXyOHvGPv8kOl-TsjXri3g5xjhGZprpRDg&s",
    category: "Earphone",
    description: {
      driver: "10 mm magnetic fluid",
      audio: "Hi-Res (LDAC) + Dolby Atmos",
      ANC: "Adaptive Noise Cancelling",
      Mic: "6 microphone",
      battery: "hingga 10 jam",
      bluetooth: "5.3 (multipoint 3 device)",
      waterresistance: "IPX4"
    }
  },
  {
    id: "17",
    name: "Apple Watch Ultra",
    price: 14999000,
    image: "https://images.unsplash.com/photo-1713056878930-c5604da9acfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBXYXRjaCUyMFVsdHJhfGVufDB8fDB8fHww",
    category: "Smartwatch",
    description: {
      display: "49mm LTPO OLED (Always-On)",
      chip: "Apple S8 / S9",
      connectivity: "GPS dual-band + LTE",
      battery: "hingga 36 jam",
      waterresistance: "100m",
      build: "Titanium"
    }
  },
  {
    id: "18",
    name: "Galaxy Watch8",
    price: 5999000,
    image: "https://images.samsung.com/is/image/samsung/p6pim/id/f2507/gallery/id-galaxy-watch8-l330-sm-l330ndaaxse-thumb-547647554?$Q90_330_330_F_PNG$",
    category: "Smartwatch",
    description: {
      display: "Super AMOLED (hingga 3000 nits)",
      chip: "Exynos W1000 (3nm)",
      ram: "2GB",
      storage: "32GB",
      os: "Wear OS 6",
      battery: "hingga ±1 hari",
      waterresistance: "5ATM + IP68"
    }
  },
  {
    id: "19",
    name: "HUAWEI WATCH Ultimate 2",
    price: 12999000,
    image: "https://images.unsplash.com/photo-1754330895582-b2e65c630f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SFVBV0VJJTIwV0FUQ0glMjBVbHRpbWF0ZSUyMDJ8ZW58MHx8MHx8fDA%3D",
    category: "Smartwatch",
    description: {
      display: "1.5” LTPO AMOLED (3500 nits)",
      material: "Liquid metal + sapphire",
      waterresistance: "20 ATM",
      sensor: "ECG, SpO2, temperature, depth",
      battery: "hingga 14 hari",
      connectivity: "Bluetooth, GPS dual-band"
    }
  },
  {
    id: "20",
    name: "XIAOMI Smart Band 7 Pro",
    price: 1099000,
    image: "https://images.unsplash.com/photo-1661605646752-0e26e50d33d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8WGlhb21pJTIwV2F0Y2glMjA1fGVufDB8fDB8fHww",
    category: "Smartwatch",
    description: {
      display: "1.64” AMOLED (Always-On)",
      resolusi: "280 × 456 px",
      battery: "hingga 12 hari",
      bluetooth: "5.2",
      gps: "built-in (multi-system)",
      waterresistance: "5ATM"
    }
  },
  {
    id: "21",
    name: "Galaxy Fit3",
    price: 899000,
    image: "https://images.samsung.com/is/image/samsung/p6pim/id/sm-r390nidaxse/gallery/id-galaxy-fit3-r390-sm-r390nidaxse-thumb-539926077?$Q90_330_330_F_PNG$",
    category: "Smartwatch",
    description: {
      display: "1.6” AMOLED",
      battery: "hingga 13 hari",
      bluetooth: "5.3",
      sensor: "HR, SpO2, stress, sleep",
      sport: "100+ mode",
      waterresistance: "5ATM + IP68"
    }
  },
  {
    id: "22",
    name: "Apple Watch Series 9",
    price: 3499000,
    image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaCUyMHNlcmklMjA5fGVufDB8fDB8fHww",
    category: "Smartwatch",
    description: {
      display: "LTPO OLED (Always-On, 2000 nits)",
      chip: "Apple S9 SiP",
      storage: "64GB",
      battery: "hingga 18 jam",
      conectivity: "GPS + LTE (opsional)",
      waterresistance: "50m"
    }
  },
  {
    id: "23",
    name: "Airpods Max",
    price: 8999000,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QWlycG9kcyUyME1heHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Headphone",
    description: {
      driver: "Apple dynamic driver",
      chip: "Apple H1",
      ANC: "Active Noise Cancelling",
      battery: "hingga 20 jam",
      mic: "9 microphone",
      bluetooth: "5.0"
    }
  },
  {
    id: "24",
    name: "JBL CLUB ONE",
    price: 6999000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwe968fc69/JBL_CLUB_ONE_Product%20Photo_HERO.jpg?sw=270&sh=330&sm=fit&sfrm=png",
    category: "Headphone",
    description: {
      driver: "40 mm graphene",
      audio: "Hi-Res Audio",
      ANC: "True Adaptive ANC",
      battery: "25 jam (45 jam tanpa ANC)",
      bluetooth: "5.0",
      berat: "±378g"
    }
  },
  {
    id: "25",
    name: "JBL Live 600NC",
    price: 2999000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw414699ef/JBL_LIVE_660NC_Product_Image_Hero_Blue.jpg?sw=270&sh=330&sm=fit&sfrm=png",
    category: "Headphone",
    description: {
      driver: "40 mm dynamic",
      audio: "JBL Signature Sound",
      ANC: "Adaptive Noise Cancelling",
      battery: "hingga 50 jam",
      bluetooth: "5.0 (Multipoint)",
      berat: "±260 g"
    }
  },
  {
    id: "26",
    name: "JBL Quantum 350",
    price: 2299000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw636914f3/1.JBL_Quantum%20350%20Wireless_Product%20Image_Hero.jpg?sw=270&sh=330&sm=fit&sfrm=png",
    category: "Headphone",
    description: {
      driver: "40 mm",
      audio: "JBL QuantumSOUND + Surround",
      wireless: "2.4GHz low latency",
      mic: "detachable boom mic",
      battery: "hingga 22 jam",
      berat: "252 gram"
    }
  },
  {
    id: "27",
    name: "JBL Quantum 600",
    price: 2899000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw6afd9cfc/JBL_QUANTUM%20600_Product%20Image_Angle.jpg?sw=270&sh=330&sm=fit&sfrm=png",
    category: "Headphone",
    description: {
      driver: "50 mm",
      audio: "QuantumSOUND + QuantumSURROUND",
      wireless: "2.4GHz low latency",
      mic: "flip-up boom mic",
      battery: "hingga 14 jam",
      berat: "346 gram"
    }
  },
  {
    id: "28",
    name: "JBL Quantum 800",
    price: 3799000,
    image: "https://id.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwbd6801f8/JBL_Quantum%20800_Product%20Image_ANGLE_White.jpg?sw=270&sh=330&sm=fit&sfrm=png",
    category: "Headphone",
    description: {
      driver: "50 mm (Hi-Res)",
      audio: "QuantumSURROUND + DTS X",
      wireless: "2.4GHz + Bluetooth",
      ANC: "Active Noise Cancelling",
      battery: "hingga 14 jam",
      berat: "410g"
    }
  },
  {
    id: "29",
    name: "Tatum 4 PF",
    price: 1939000,
    image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a6cd9f10-a4cf-4579-ad98-34183a2d8c3b/JORDAN+TATUM+4+LEA+PF.png",
    category: "Shoes",
    description: {
      upper: "Textile mesh (ringan & fleksibel)",
      cushion: "Cushlon foam + Air Zoom",
      support: "TPU shank",
      traction: "multi-directional outsole",
      fit: "normal / wide (PF)",
      use: "indoor & outdoor"
    }
  },
  {
    id: "30",
    name: "Nike Vomero 18",
    price: 1909000,
    image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/25329f12-0e3a-4641-a94f-325bbca68811/W+NIKE+VOMERO+18.png",
    category: "Shoes",
    description: {
      cushion: "ZoomX + ReactX (max cushion)",
      weight: "325g",
      drop: "10mm",
      stack: "46mm / 36mm",
      use: "daily & long run"
    }
  },
  {
    id: "31",
    name: "Mafate X",
    price: 4299000,
    image: "https://dms.deckers.com/hoka/image/upload/f_auto,q_auto,dpr_auto/b_rgb:f7f7f9/w_414/v1742849449/1161990-ZTM_2.png?_s=RAABAB0",
    category: "Shoes",
    description: {
      cushion: "PEBA + EVA + Carbon Plate",
      stack: "49mm / 41mm",
      drop: "8mm",
      weight: "±340g",
      outsole: "Vibram Megagrip",
      use: "ultra trail / long run"
    }
  },
  {
    id: "32",
    name: "Mafate X Hike",
    price: 4999000,
    image: "https://dms.deckers.com/hoka/image/upload/f_auto,q_auto,dpr_auto/b_rgb:f7f7f9/w_414/v1755033980/1174230-HSL_2.png?_s=RAABAB0",
    category: "Shoes",
    description: {
      cushion: "PEBA + EVA + Carbon Plate",
      stack: "49mm / 41mm",
      drop: "8mm",
      outsole: "Vibram Megagrip",
      type: "hiking boot (high-cut)",
      use: "long hike / trekking"
    }
  },
  {
    id: "33",
    name: "Duramo SL 2 Running Shoes",
    price: 900000,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/1d020e154c9744a7a33d33764ef9d468_9366/Duramo_SL_2_Running_Shoes_Pink_JI3009_HM3_hover.jpg",
    category: "Shoes",
    description: {
      cushion: "LIGHTMOTION",
      weight: "±250–290g",
      drop: "8–9mm",
      upper: "mesh breathable",
      outsole: "Adiwear",
      use: "daily / beginner running",
    }
  },
  {
    id: "34",
    name: "Terrex Agravic 4 Trail Running Shoes",
    price: 2100000,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/b347127383164c5d85f032c5073875ce_9366/Terrex_Agravic_4_Trail_Running_Shoes_White_KJ8872_02_standard_hover.jpg",
    category: "Shoes",
    description: {
      cushion: "Lightstrike foam",
      weight: "±283g",
      drop: "8–9mm",
      outsole: "Continental rubber",
      lug: "3.1mm",
      use: "trail ringan / hiking"
    }
  },
];
export default products;
const express = require("express");
const { search } = require("fast-fuzzy");

const app = express();
app.use(express.json());

let emerald_account_budget = 1000;

let campaigns = [
  {
    id: 1,
    name: "Sneakers Campaign",
    keywords: ["boots", "nike", "adidas", "shoes"],
    offerAmount: 1,
    budget: 100,
    status: true,
    city: "New York",
    radius: 10,
  },
  {
    id: 2,
    name: "Gucci Campaign",
    keywords: ["gucci", "clothes", "fashion"],
    offerAmount: 1,
    budget: 1200,
    status: true,
    city: "Tokyo",
    radius: 20,
  },
  {
    id: 3,
    name: "Fashion Clothes Campaign",
    keywords: ["fashion", "clothes", "stars"],
    offerAmount: 11234,
    budget: 900,
    status: false,
    city: "Milan",
    radius: 50,
  },
  {
    id: 4,
    name: "Fashion Clothes Campaign",
    keywords: ["fashion", "clothes", "stars"],
    offerAmount: 11234,
    budget: 12300,
    status: false,
    city: "Milan",
    radius: 50,
  },
];

const cities = [
  {
    id: 1,
    description: "London",
  },
  {
    id: 2,
    description: "Paris",
  },
  {
    id: 3,
    description: "Dubai",
  },
  {
    id: 4,
    description: "Tokyo",
  },
  {
    id: 5,
    description: "New York",
  },
  {
    id: 6,
    description: "Hongkong",
  },
  {
    id: 7,
    description: "Barcelona",
  },
  {
    id: 8,
    description: "Amsterdam",
  },
  {
    id: 9,
    description: "Rome",
  },
  {
    id: 10,
    description: "Milan",
  },
];

const keywords = [
  "clothing",
  "fashion",
  "style",
  "designer",
  "couture",
  "luxury",
  "apparel",
  "accessories",
  "footwear",
  "shoes",
  "sneakers",
  "heels",
  "boots",
  "sandals",
  "flip flops",
  "sunglasses",
  "jewelry",
  "watches",
  "handbags",
  "wallets",
  "belts",
  "hats",
  "scarves",
  "gloves",
  "makeup",
  "cosmetics",
  "skincare",
  "perfume",
  "fragrance",
  "hairstyles",
  "haircare",
  "nail polish",
  "trends",
  "runway",
  "models",
  "photography",
  "fashion week",
  "street style",
  "vintage",
  "thrift store",
  "sustainable fashion",
  "fast fashion",
  "design",
  "sewing",
  "tailoring",
  "textiles",
  "patterns",
  "fabrics",
  "color palettes",
  "fashion icons",
  "red carpet",
  "fashion bloggers",
  "influencers",
  "fashionista",
  "men's fashion",
  "women's fashion",
  "children's fashion",
  "plus-size fashion",
  "activewear",
  "yoga pants",
  "athletic shoes",
  "gym clothes",
  "sports bras",
  "Gucci",
  "Prada",
  "Chanel",
  "Louis Vuitton",
  "Dior",
  "Versace",
  "Valentino",
  "Hermes",
  "Burberry",
  "Armani",
  "Ralph Lauren",
  "Calvin Klein",
  "Tom Ford",
  "Yves Saint Laurent",
  "Michael Kors",
  "Fendi",
  "GAP",
  "H&M",
  "Zara",
  "Forever 21",
  "Adidas",
  "Nike",
  "Puma",
  "Under Armour",
  "Reebok",
  "Levi's",
  "Diesel",
];

let counter = campaigns.length + 1;

app.get("/campaigns", function (request, response) {
  return response.send(campaigns);
});

app.get("/budget", function (request, response) {
  return response.send({ budget: emerald_account_budget });
});

app.delete("/campaigns", function (request, response) {
  const index = campaigns.findIndex((item) => {
    return item.id === request.body.id;
  });

  if (index >= 0) {
    campaigns.splice(index, 1);
    return response.send(`item ${request.body.id} deleted`);
  } else {
    return response.send(`element not found`);
  }
});

app.post("/campaigns", function (request, response) {
  if (
    !request.body.keywords.length > 0 ||
    !request.body.offerAmount ||
    !request.body.budget ||
    !request.body.city ||
    !request.body.radius
  ) {
    return response.status(400).send("missing mandatory field");
  }

  // Check request for non valid items
  const new_campaign = request.body;

  if (new_campaign.budget > emerald_account_budget)
    return response.status(400).send("not enough funds");

  if (new_campaign.id == undefined) {
    new_campaign.id = counter++;
    emerald_account_budget -= new_campaign.budget;
    campaigns.unshift(new_campaign);
    return response.send("new item added");
  } else {
    const index = campaigns.findIndex((item) => {
      return item.id === new_campaign.id;
    });

    if (new_campaign.budget < campaigns[index].budget)
      return response.status(400).send("can't be lower than old value");

    emerald_account_budget -= new_campaign.budget - campaigns[index].budget;

    campaigns[index] = new_campaign;
    return response.send(`item ${new_campaign.id} updated`);
  }
});

app.get("/cities", function (request, response) {
  return response.send(cities);
});

app.get("/keywords", function (request, response) {
  let foundKeywords = search(request.query.keyword, keywords);
  return response.send(foundKeywords);
});

app.listen(4001);

const seed = [
  {
    id: "p1",
    name: "Wireless Mouse",
    category: "Accessories",
    price: 99.9,
    stock: 12,
    rating: 4.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 249.0,
    stock: 5,
    rating: 4.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "p3",
    name: "Indie Game “Nebula”",
    category: "Games",
    price: 59.99,
    stock: 40,
    rating: 4.2,
    createdAt: new Date().toISOString(),
  },
];

let db = [...seed]; // replace with localStorage load if you want

const delay = (min = 300, max = 700) =>
  new Promise((r) => setTimeout(r, Math.random() * (max - min) + min));

export async function getProducts() {
  await delay();
  return structuredClone(db);
}

export async function createProduct(input) {
  await delay();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const product = { id, createdAt, ...input };
  db.unshift(product);
  return structuredClone(product);
}

export async function updateProduct(id, patch) {
  await delay();
  const i = db.findIndex((p) => p.id === id);
  if (i === -1) throw new Error("Not found");
  db[i] = { ...db[i], ...patch };
  return structuredClone(db[i]);
}

export async function deleteProduct(id) {
  await delay();
  const i = db.findIndex((p) => p.id === id);
  if (i === -1) throw new Error("Not found");
  const [removed] = db.splice(i, 1);
  return structuredClone(removed);
}

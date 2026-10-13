const app = require("./app");
const PORT = process.env.MIPUERTO || process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`SERVIDOR EXPRESS: http://localhost:${PORT}`);
});

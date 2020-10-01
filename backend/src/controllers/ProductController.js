const mongoose = require("mongoose");
const requireDir = require("require-dir");

requireDir("../models");
const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const product = await Product.paginate({}, { page, limmit: 20 });

    return res.json(product);
  },
  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findById(id);

    return res.json(product);
  },

  async store(req, res) {
    const { title, description, url } = req.body;

    const product = await Product.create({
      title,
      description,
      url,
    });

    return res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    console.log(data);

    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.json(product);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.findByIdAndRemove(id);

    return res.send("Deletado");
  },
};

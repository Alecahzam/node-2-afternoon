module.exports = {
  create: (req, res) => {
    const dbInstance = req.app.get("db");
    const { name, description, price, image_url } = req.body;

    dbInstance.create_product([name, description, price, image_url]).then(() =>
      res.sendStatus(200).catch(error => {
        res.status(500).send({ errorMessage: "Oopsie woopsie" });
        console.log(error);
      })
    );
  },

  getOne: (req, res) => {
    const dbInstance = req.app.get("db");
    const { params } = req;
    dbInstance
      .read_product(params.id)
      .then(product => res.status(200).send(product))
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Oh fwick im dwopping awll my uwus's! OwO" });
        console.log(error);
      });
  },

  getAll: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .read_products()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "According to all known laws of aviation, there is no way a bee should be able to fly."
        });
        console.log(err);
      });
  },

  update: (req, res) => {
    const dbInstance = req.app.get("db");
    const { params, query } = req;

    dbInstance
      .update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "i have ligma" });
        console.log(err);
      });
  },

  delete: (req, res) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_product(params.id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "MAMMIA MIA" });
        console.log(err);
      });
  }
};

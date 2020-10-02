class ServiceController {
  async index(request, response) {
    response.json({ msg: "index" });
  }

  async show(request, response) {
    response.json({ msg: "show" });
  }

  async store(request, response) {
    response.json({ msg: "store" });
  }
}

module.exports = ServiceController;

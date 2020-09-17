import { Request, Response } from "express";
import DevModel from "../models/DevModel";
const bcryptjs = require("bcryptjs");

class DevController {
  async index(request: Request, response: Response) {
    const devs = await DevModel.find();

    response.send(devs);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      telephone,
      technologies,
      portfolio,
      bio,
      avatar_url,
      username,
      password,
    } = request.body;

    const techsArray = technologies
      .split(",")
      .map((tech: string) => tech.trim());

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    const answer = await DevModel.create({
      name,
      email,
      telephone,
      technologies: techsArray,
      portfolio,
      bio,
      avatar_url,
      username,
      password: encryptedPassword,
    });
    response.json({ answer });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      email,
      telephone,
      technologies,
      portfolio,
      bio,
      avatar_url,
      username,
    } = request.body;
    let dev = await DevModel.findById(id);
    console.log(dev);
    if (!dev) response.status(404);

    const techsArray = technologies
      .split(",")
      .map((tech: string) => tech.trim());

    let newDev = await DevModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        telephone,
        technologies: techsArray,
        portfolio,
        bio,
        avatar_url,
        username,
      },
      {
        new: true,
      }
    );

    response.send(newDev);
  }
}

export default DevController;

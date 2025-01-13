const Project = require("../models/Project");

// Получение всех проектов
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Добавление нового проекта
const addProject = async (req, res) => {
  try {
    const {
      name,
      symbol,
      type,
      participants,
      totalRaised,
      athSinceIDO,
      endDate,
      chain,
      logoUrl,
      description,
    } = req.body;

    const project = new Project({
      name,
      symbol,
      type,
      participants,
      totalRaised,
      athSinceIDO,
      endDate,
      chain,
      logoUrl,
      description, // Новое поле
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllProjects, addProject };

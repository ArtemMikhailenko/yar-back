const Project = require("../models/Project");

// Получение всех проектов
const getAllProjects = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query);

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "Проекты с таким статусом не найдены" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
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
      bannerUrl,
      startDate,
      targetRaise,
      totalParticipants,
      timeUntilStart,
      description,
      status,
      categories,
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
      bannerUrl,
      startDate,
      targetRaise,
      totalParticipants,
      timeUntilStart,
      description,
      status,
      categories, // Новое поле
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllProjects, addProject };

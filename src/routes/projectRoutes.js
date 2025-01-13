const express = require("express");
const Project = require("../models/Project"); // <-- Добавлено!
const {
  getAllProjects,
  addProject,
} = require("../controllers/projectController");
const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of all projects
 *       500:
 *         description: Server error
 */
router.get("/", getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Add a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               symbol:
 *                 type: string
 *               type:
 *                 type: string
 *               participants:
 *                 type: number
 *               totalRaised:
 *                 type: number
 *               athSinceIDO:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               chain:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               description:
 *                 type: string
 *                 description: Detailed description of the project
 *     responses:
 *       201:
 *         description: Project added successfully
 *       500:
 *         description: Server error
 */
router.post("/", addProject);
/**
 * @swagger
 * /api/projects/{name}:
 *   get:
 *     summary: Get a project by name
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the project
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const project = await Project.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

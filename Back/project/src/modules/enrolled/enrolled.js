import { Router } from "express";
import { driver } from "../../../DB/db.conect.js"; 
const router = Router();

router.post("/", async (req, res) => {
  const session = driver.session();

  const { studentName, courseName } = req.body;

  // Define a Cypher query to create an ENROLLED_IN relationship
  const cypherQuery = `
    MATCH (s:student),(c:course) WHERE s.name='${studentName}' AND c.name='${courseName}' 
    CREATE (s)-[r:ENROLLED_IN]->(c)
    RETURN r;
    `;

  try {
    // Execute the Cypher query
    await session.run(cypherQuery, { studentName, courseName });

    res.status(201).json({ message: "successfully" });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the session and release resources
    session.close();
  }
});

export default router;

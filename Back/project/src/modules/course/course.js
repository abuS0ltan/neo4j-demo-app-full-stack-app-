import { Router } from "express";
import { driver } from "../../../DB/db.conect.js"; 
const router=Router();

// Define a route for creating a course node
router.post('/add', async (req, res) => {
    const session = driver.session();
  
    const { name } = req.body;
  
    // Define a Cypher query to create a course node
    const cypherQuery = `
      CREATE (:course {name: "${name}"})
    `;
  
    try {
      // Execute the Cypher query
      await session.run(cypherQuery, { name });
  
      res.status(201).json({ message: 'successfully' });
    } catch (error) {
      console.error('Error creating course node:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the session and release resources
      session.close();
    }
  });

  // Define a route for getting information about all courses
router.get('/get', async (req, res) => {
  const session = driver.session();

  // Define a Cypher query to retrieve information about all course nodes
  const cypherQuery = `
    MATCH (c:course)
    RETURN c
  `;

  try {
    // Execute the Cypher query
    const result = await session.run(cypherQuery);

    // Extract and send the data of all course nodes as JSON
    const coursesData = result.records.map(record => record.get('c').properties);
    res.json(coursesData);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the session and release resources
    session.close();
  }
});

export default router;

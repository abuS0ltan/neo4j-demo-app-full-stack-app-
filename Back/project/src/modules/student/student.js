import { Router } from "express";
import { driver } from "../../../DB/db.conect.js"; 
const router=Router();

// Define a route for creating a student node
router.post('/add', async (req, res) => {
    const session = driver.session();
  
    const { name } = req.body;
  
    // Define a Cypher query to create a student node
    const cypherQuery = `
      CREATE (:student {name: "${name}"})
    `;

    try {
      // Execute the Cypher query
      await session.run(cypherQuery, { name });
  
      res.status(201).json({ message: 'successfully' });
    } catch (error) {
      console.error('Error creating student node:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the session and release resources
      session.close();
    }
  });

// Define a route for getting information about all students

  router.get('/get', async (req, res) => {
    const session = driver.session();
  
    // Define a Cypher query to retrieve information about all student nodes
    const cypherQuery = `
      MATCH (s:student)
      RETURN s
    `;
  
    try {
      // Execute the Cypher query
      const result = await session.run(cypherQuery);
  
      // Extract and send the data of all student nodes as JSON
      const studentsData = result.records.map(record => record.get('s').properties);
      res.json(studentsData);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the session and release resources
      session.close();
    }
  });
  export default router;

import neo4j from 'neo4j-driver';
const uri = "neo4j+s://ae543626.databases.neo4j.io"; 
const user = "neo4j";      
const password = "m97OeALyoF8wdunjTngzoPHso-Q5PBrrZAlA-ph3pY8";
// Create a Neo4j driver instance
export const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));  
require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const dbName = "Node";

const getCollection = async (collection) => {
  const findResult = await collection.find({});
  const documents = await findResult.toArray();
  const documentCount = await findResult.count();

  return [documents, documentCount];
};

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  let collectionDetails = await getCollection(collection);

  console.log(
    "Found documents =>",
    collectionDetails[0],
    "With count: ",
    collectionDetails[1]
  );

  const docToInsert = {
    FirstName: "Jeff",
    LastName: "Bezos",
    City: "Seattle",
  };

  await collection.insertOne(docToInsert); // Inserts one document into the collection.

  collectionDetails = await getCollection(collection);

  console.log(
    "Collection after insertion => ",
    collectionDetails[0],
    "With count: ",
    collectionDetails[1]
  );

  //   const insertedDocuments = await collection.insertMany([docToInsert]); // Inserts many documents into the collection.

  const deletedDocument = await collection.deleteMany({ FirstName: "Jeff" });

  collectionDetails = await getCollection(collection);

  console.log(
    "Collection after deletion => ",
    collectionDetails[0],
    "With count: ",
    collectionDetails[1]
  );

  return "done.";
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

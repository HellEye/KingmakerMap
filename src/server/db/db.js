import * as settings from "../serverSettings"
import mongodb from "mongodb"

// const mongoClient = new mongodb.MongoClient(settings.MONGO_URL)
// const connection=mongoClient.connect()

// const testConnection = () =>{
//     mongo.connect((err) => {
//         if (err) {
//             console.error("Big error in database", err)
//             throw err
//         }
//         console.log("db connected")

//         const db = mongo.db(settings.MONGO_DB_NAME)

//         console.log(
//             db
//                 .collection("markers")
//                 .find({})
//                 .toArray((err, docs) => {
//                     if(err){
//                         console.error("Error when loading from db", err)
//                         throw err
//                     }
//                     console.log(docs)

//                 })
//         )
//     })
// }

class MongoDb {
	constructor() {
		this.connectToMongoDB()
		this.readyCallback = () => {}
	}
	async connectToMongoDB() {
		if (!this.db) {
			const options = {
				useUnifiedTopology: true
			}

			try {
				const client = new mongodb.MongoClient(settings.MONGO_URL, options)
				await client.connect()
				this.db = client.db(settings.MONGO_DB_NAME)
				if (this.readyCallback) this.readyCallback()
			} catch (err) {
				console.error(err, "MongoDB connection failed.")
			}
		}
	}

	async insert(doc, collection, options) {
		if (!options) options = {}
		if (this.db) {
			try {
				return await this.db.collection(collection).insertOne(doc)
			} catch (err) {
				console.error(err, "Something went wrong - insert")
			}
		}
	}

	async update(oldDoc, newDoc, collection, options) {
		if (!options) options = {}
		if (this.db) {
			try {
				if ("$pull" in newDoc)
					return await this.db
						.collection(collection)
						.updateOne(oldDoc, { $pull: newDoc.$pull }, { upsert: true })
				return await this.db
					.collection(collection)
					.updateOne(oldDoc, { $set: newDoc.$set?newDoc.$set:newDoc }, { upsert: true })
			} catch (err) {
				console.error(err, "Something went wrong - update")
			}
		}
	}

	async delete(oldDoc, collection, options) {
		if (!options) options = {}
		if (this.db) {
			try {
				return await this.db.collection(collection).deleteOne(oldDoc)
			} catch (err) {
				console.error(err, "Something went wrong - delete")
			}
		}
	}

	async find(obj, collection, options, projection) {
		if (!this.db) return
		if (!options) options = {}
		if (!projection) projection = {}
		try {
			return await this.db
				.collection(collection)
				.find(obj, {...options,projection})
				.toArray()
		} catch (err) {
			console.error(err, "Something went wrong - find")
		}
	}
}
const instance = new MongoDb()

export default instance

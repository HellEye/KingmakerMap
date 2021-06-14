/* eslint-disable import/first */
require("babel-polyfill")
require("babel-core/register")
import express from "express"
import * as settings from "./serverSettings"
import db from "./db/db"
import socketio from "socket.io"
import http from "http"
import path from "path"
import { ObjectID } from "bson"

const app = express()
const server = http.createServer(app)

const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
	allowEIO3: true,
})

const users = []
const getUser = (id) => {
	const foundUser = users.find((v) => v.id === id)
	return foundUser ? foundUser.name : "<undefined>"
}
io.on("connection", (socket) => {
	console.info("connected from " + socket.id)
	socket.on("greet", ({ clientName }) => {
		if (getUser(socket.id) === "<undefined>")
			users.push({ id: socket.id, name: clientName })
	})

	//CRUD calls to db
	socket.on(
		"find",
		({ collection, findObj, options, causedBy, projection }) => {
			console.info(
				`received find from ${getUser(socket.id)} with `,
				collection,
				findObj, 
				projection
			)
			if (findObj && "_id" in findObj) findObj._id = ObjectID(findObj._id)
			db.find(findObj, collection, options, projection).then((result) => {
				const data = {
					collection: collection,
					result: result,
					findObj: findObj,
					options: options,
					operation: "find",
					causedBy: causedBy,
				}
				io.to(socket.id).emit("found", data)
			})
		}
	)

	socket.on("delete", async ({ collection, findObj, options }) => {
		console.info(
			`received delete from ${getUser(socket.id)} with `,
			collection,
			findObj
		)
		if (findObj && "_id" in findObj) findObj._id = ObjectID(findObj._id)
		const idToChange = await getIdToChange(findObj, collection)
		db.delete(findObj, collection, options).then(
			makeReply("delete", collection, findObj, options, idToChange)
		)
	})

	socket.on("update", async ({ collection, findObj, newObj, options }) => {
		console.info(
			`received update from ${getUser(socket.id)} with `,
			collection,
			findObj,
			newObj
		)
		const idToChange = await getIdToChange(findObj, collection)
		db.update(findObj, newObj, collection, options).then(
			makeReply("update", collection, findObj, options, idToChange, newObj)
		)
	})

	socket.on("insert", ({ collection, newObj, options }) => {
		console.info(`received insert from ${getUser(socket.id)} with `, collection)
		db.insert(newObj, collection, options).then(
			makeReply("insert", collection, undefined, options, undefined, newObj)
		)
	})
})

server.listen(settings.SOCKET_PORT)
console.log(`Socket listening on localhost:${settings.SOCKET_PORT}`)

function makeReply(
	operation,
	collection,
	findObj,
	options,
	idToChange,
	newObj
) {
	return (result) => {
		const data = {
			collection: collection,
			result: result,
			findObj: findObj,
			newObj: newObj,
			options: options,
			operation: operation,
			newId:
				idToChange || result?._id?.toString() || result?.insertedId?.toString(),
		}
		io.emit("changed", data)
	}
}
async function getIds(collection, findObj) {
	const result = await db.find(findObj, collection)
	return result.map((v) => v._id)
}

async function getIdToChange(findObj, collection) {
	if (findObj && "_id" in findObj) findObj._id = ObjectID(findObj._id)
	const idsList = findObj._id
		? [findObj._id]
		: await getIds(collection, findObj)
	const idToChange = idsList ? idsList[0] : ""
	return idToChange
}

//callback to ensure db is connected when executing main code
//not necessary later with socket
// db.readyCallback=main

import { reaction, isObservableArray } from "mobx"

/**
 * Function will create a mobx reaction to watch given fields for changes,
 * and will call the fieldChanged method of the object, passing the name of the changed field as an argument
 * @param {Object} obj the object to watch and notify about changes
 * @param  {...String} fieldNames names of fields to watch for changes (will also be passed as string)
 * @returns an array of reaction disposers
 */
function fieldChangeObserver(obj, callback, ...fieldNames) {
	return fieldNames.map((fieldName) => {
		if (isObservableArray(obj[fieldName])) {
     
      return reaction(
        //when obj.fieldName is changed
        () => obj[fieldName].slice(),
        (newValue, previousValue) => {
          callback?.(fieldName, newValue, previousValue)
        }
      )
		}
		return reaction(
			//when obj.fieldName is changed
			() => obj[fieldName],
			(newValue, previousValue) => {
				callback?.(fieldName, newValue, previousValue)
			}
		)
	})
}

/**
 * Helper function of FieldChangedObserver
 * @param {Object} thisObj used for this context inside, should usually be this
 * @param {Object} parent parent object of this one. if not specified returns the accumulated findObj and newObj
 * @param {String} DBNAME db name parent will use to append to the dot find string
 * @returns {function} used by fieldChangeObserver
 */
function fieldChanged(thisObj, parent, DBNAME) {
	return (fieldName, objName, incFindObj, incNewObj, dbName) => {
		const findObj = {}
		const newObj = {}
		if (fieldName) {
			findObj._id = thisObj.id
			newObj[fieldName] = thisObj[fieldName]
		}
		if (objName) {
			for (const key in findObj) {
				findObj[`${dbName}${dbName ? "." : ""}${key}`] = incFindObj[key]
			}
			for (const key in newObj) {
				newObj[`${dbName}${dbName ? "." : ""}${key}`] = incNewObj[key]
			}
		}
		// console.log("level", typeof thisObj)
		// console.log("parent", parent)
		// console.log(findObj)
		// console.log(newObj)
		if (parent) parent.fieldChanged("", "settlement", findObj, newObj, DBNAME)
	}
}

export { fieldChanged }
export default fieldChangeObserver

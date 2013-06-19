module.exports = function(db, insertDb, counterKey){
	if(typeof insertDb === "string"){
		insertDb = db.sublevel(insertDb);
	}

	//use the db namespace as the default key
	if(!counterKey){
		counterKey = insertDb.options.sep + insertDb._prefix;
	}

	insertDb.insert = function(data, cb){
		db.get(counterKey, function(err, counter){
			if(err){
				if(err.name === "NotFoundError") counter = 0;
				else return cb(err);
			}

			if(typeof counter !== "number") counter = parseInt(counter, 10);

			counter += 1;

			insertDb.put(counter, data, function(err){
				if(err) cb(err);
				else db.put(counterKey, counter, cb);
			});
		});
	};
};
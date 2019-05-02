# cheganti.github.io
## MongoDB Task3:

### Query and Results:

1) How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?

	db.restaurants.find({cuisine: "Chinese", borough: "Queens"}).count();
  
	728
  
  
2) What is the _id of the restaurants which has the grade with the highest ever score?

   #### Qury: db.restaurants.find().sort({"grades.score": -1}).limit(1).next()._id
   #### Result: ObjectId("5ccaab62eb13dff33977843a")
    
3) Add a grade { grade: “A”, score: 7, date: ISODate() } every restaurant in “Manhattan” (borough)

	#### Query: db.restaurants.updateMany({ borough: "Manhattan" },{$push: {grades: { grade: "A", score: 7, date: ISODate()  }}});
	#### Result: { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
  
4) What are the names of the restaurants which have a grade at index 8 with score less than 7? Use projection to include only names without _id.

	#### Query: db.restaurants.find({"grades.7.score" : {$lt:7}}, {name: 1, _id: 0});
	#### Result: 
	{ "name" : "El Castillo De Madison" }
	{ "name" : "Vee'S Restaurant" }
	{ "name" : "Don Alex Restaurant" }
	{ "name" : "Gahm Mi Oak Restaurant" }
	{ "name" : "Au Za'Atar" }
	{ "name" : "Sunshine 27 Seafood Restaurant" }
	{ "name" : "New Chung Mee Restaurant" }
	{ "name" : "Lucky 11 Bakery" }
	{ "name" : "La Cueva Deli & Grocery" }
	{ "name" : "Kennedy Fried Chicken" }
	{ "name" : "New China Star" }
	{ "name" : "Hoy Wong Restaurant" }
	{ "name" : "Elena'S Restuarant" }

5) What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

	#### Query: db.restaurants.find({ $and: [{ "cuisine": "Seafood" }, { "grades.grade": "B" }, { "grades.date": { $gt: ISODate("2014-02-01"), $lt: ISODate("2014-03-01") } }] },{_id: 1, borough: 1});
	#### Result:
	{ "_id" : ObjectId("5ccaab62eb13dff3397783a9"), "borough" : "Queens" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397783af"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397783e1"), "borough" : "Bronx" }
	{ "_id" : ObjectId("5ccaab62eb13dff33977845e"), "borough" : "Bronx" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397784d1"), "borough" : "Brooklyn" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397787c2"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778b56"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778c79"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778e02"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778ef5"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778f56"), "borough" : "Brooklyn" }
	{ "_id" : ObjectId("5ccaab62eb13dff339778f7c"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339779242"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339779293"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397792be"), "borough" : "Queens" }
	{ "_id" : ObjectId("5ccaab62eb13dff33977932f"), "borough" : "Brooklyn" }
	{ "_id" : ObjectId("5ccaab62eb13dff33977939c"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff3397796f7"), "borough" : "Manhattan" }
	{ "_id" : ObjectId("5ccaab62eb13dff339779b34"), "borough" : "Queens" }
	{ "_id" : ObjectId("5ccaab62eb13dff339779c33"), "borough" : "Queens" }

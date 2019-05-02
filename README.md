# cheganti.github.io
Go to the folder where the mongodb installed

C://program files/ MongoDB/ Server / 4.0 /bin => open cmd

To import frontcamp db
Mongoimport  --db frontcamp --collection restaurants --file <path to restaurants.json>

Run  mongo

Type mongod (Assuming you want to use default data directory and port for the instance run mongod without any parameters)

To use a specific port for the mongoDB instance type mongo –port {{port number}}

## MongoDB Task1:
1) Use frontcamp 

switched to db frontcamp  

2) db.restaurants.count()

25359

3) db.restaurants.find({borough: "Brooklyn"}).count()

6086

4) db.restaurants.findOne()

{
        "_id" : ObjectId("5cc1ba1008b6ec199c9baf9e"),
        "address" : {
                "building" : "1007",
                "coord" : [
                        -73.856077,
                        40.848447
                ],
                "street" : "Morris Park Ave",
                "zipcode" : "10462"
        },
        "borough" : "Bronx",
        "cuisine" : "Bakery",
        "grades" : [
                {
                        "date" : ISODate("2014-03-03T00:00:00Z"),
                        "grade" : "A",
                        "score" : 2
                },
                {
                        "date" : ISODate("2013-09-11T00:00:00Z"),
                        "grade" : "A",
                        "score" : 6
                },
                {
                        "date" : ISODate("2013-01-24T00:00:00Z"),
                        "grade" : "A",
                        "score" : 10
                },
                {
                        "date" : ISODate("2011-11-23T00:00:00Z"),
                        "grade" : "A",
                        "score" : 9
                },
                {
                        "date" : ISODate("2011-03-10T00:00:00Z"),
                        "grade" : "B",
                        "score" : 14
                }
        ],
        "name" : "Morris Park Bake Shop",
        "restaurant_id" : "30075445"
}

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

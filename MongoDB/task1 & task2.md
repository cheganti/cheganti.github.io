
MongoDB Task1
1) How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?
###### Query:
    db.restaurants.find({cuisine: "Chinese", borough: "Queens"}).count();
###### Result:
    728
2) What is the _id of the restaurants which has the grade with the highest ever score?
###### Query:
    db.restaurants.find({},{ _id: 1}).sort({"grades.score": -1}).limit(1);
###### Result:
    { "_id" : ObjectId("5ccaab62eb13dff33977843a") }
3) Add a grade { grade: “A”, score: 7, date: ISODate() } every restaurant in “Manhattan” (borough)
###### Query:
    db.restaurants.updateMany({ borough: "Manhattan" },{$push: {grades: { grade: "A", score: 7, date: ISODate()  }}});
######  Result:
    { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
4) What are the names of the restaurants which have a grade at index 8 with score less than 7? Use projection to include only names without _id.
###### Query: 
    db.restaurants.find({ "grades.8.score" :{ $lt : 7 }},{_id:0, name:1});
###### Result: 
	{ "name" : "Silver Krust West Indian Restaurant" }
	{ "name" : "Pure Food" }
5) What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period
from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.
######  Query: 
    db.restaurants.find({cuisine: { $eq: "Seafood" },"grades":{$elemMatch:{grade: "B",date: {$gte: ISODate("2014-02-01"),$lte: ISODate("2014-03-01")}}}},{ _id:1, borough:1 });
###### Result:
	{ "_id" : ObjectId("5ccaab63eb13dff33977b845"), "borough" : "Bronx" }
	{ "_id" : ObjectId("5ccaab63eb13dff33977babf"), "borough" : "Manhattan" }

Create the following indexes:
1) Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan:
###### Query:
    db.restaurants.createIndex({"name": 1 })
    {
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 4,
        "numIndexesAfter" : 5,
        "ok" : 1
    }

    db.restaurants.find({ name: "Glorious Food" }).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "name" : {
                                "$eq" : "Glorious Food"
                        }
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "name" : 1
                                },
                                "indexName" : "name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "name" : [
                                                "[\"Glorious Food\", \"Glorious Food\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "EPINHYDW0185",
                "port" : 27017,
                "version" : "4.0.9",
                "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
        },
        "ok" : 1
}

2) Drop index from task 4.1
###### Query:
    db.restaurants.dropIndex({"name": 1 })
###### Result:
    { "nIndexesWas" : 5, "ok" : 1 }

3) Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is
	indeed covered:
###### Query:
   db.restaurants.createIndex({"restaurant_id": 1})
        {
                "createdCollectionAutomatically" : false,
                "numIndexesBefore" : 1,
                "numIndexesAfter" : 2,
                "ok" : 1
        }

    db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 }).explain("executionStats")
{
    "queryPlanner" : {
            "plannerVersion" : 1,
            "namespace" : "frontcamp.restaurants",
            "indexFilterSet" : false,
            "parsedQuery" : {
                    "restaurant_id" : {
                            "$eq" : "41098650"
                    }
            },
            "winningPlan" : {
                    "stage" : "PROJECTION",
                    "transformBy" : {
                            "_id" : 0,
                            "borough" : 1
                    },
                    "inputStage" : {
                            "stage" : "FETCH",
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "keyPattern" : {
                                            "restaurant_id" : 41098650
                                    },
                                    "indexName" : "restaurant_id_41098650",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "restaurant_id" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : false,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "restaurant_id" : [
                                                    "[\"41098650\", \"41098650\"]"
                                            ]
                                    }
                            }
                    }
            },
            "rejectedPlans" : [ ]
    },
    "executionStats" : {
            "executionSuccess" : true,
            "nReturned" : 1,
            "executionTimeMillis" : 1,
            "totalKeysExamined" : 1,
            "totalDocsExamined" : 1,
            "executionStages" : {
                    "stage" : "PROJECTION",
                    "nReturned" : 1,
                    "executionTimeMillisEstimate" : 0,
                    "works" : 2,
                    "advanced" : 1,
                    "needTime" : 0,
                    "needYield" : 0,
                    "saveState" : 0,
                    "restoreState" : 0,
                    "isEOF" : 1,
                    "invalidates" : 0,
                    "transformBy" : {
                            "_id" : 0,
                            "borough" : 1
                    },
                    "inputStage" : {
                            "stage" : "FETCH",
                            "nReturned" : 1,
                            "executionTimeMillisEstimate" : 0,
                            "works" : 2,
                            "advanced" : 1,
                            "needTime" : 0,
                            "needYield" : 0,
                            "saveState" : 0,
                            "restoreState" : 0,
                            "isEOF" : 1,
                            "invalidates" : 0,
                            "docsExamined" : 1,
                            "alreadyHasObj" : 0,
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "nReturned" : 1,
                                    "executionTimeMillisEstimate" : 0,
                                    "works" : 2,
                                    "advanced" : 1,
                                    "needTime" : 0,
                                    "needYield" : 0,
                                    "saveState" : 0,
                                    "restoreState" : 0,
                                    "isEOF" : 1,
                                    "invalidates" : 0,
                                    "keyPattern" : {
                                            "restaurant_id" : 41098650
                                    },
                                    "indexName" : "restaurant_id_41098650",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "restaurant_id" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : false,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "restaurant_id" : [
                                                    "[\"41098650\", \"41098650\"]"
                                            ]
                                    },
                                    "keysExamined" : 1,
                                    "seeks" : 1,
                                    "dupsTested" : 0,
                                    "dupsDropped" : 0,
                                    "seenInvalidated" : 0
                            }
                    }
            }
    },
    "serverInfo" : {
            "host" : "EPINHYDW0295",
            "port" : 27017,
            "version" : "4.0.9",
            "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
    },
    "ok" : 1
}

4) Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten
	Island”:
    db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index
	db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index
	db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index
###### Query:
    db.restaurants.createIndex( { cuisine: 1 },{ partialFilterExpression: { borough: { $eq:  "Staten Island" } } })
###### Result
    {
            "numIndexesBefore" : 4,
            "numIndexesAfter" : 4,
            "note" : "all indexes already exist",
            "ok" : 1
    }

    db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain("executionStats")
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "$and" : [
                                    {
                                            "borough" : {
                                                    "$eq" : "Staten Island"
                                            }
                                    },
                                    {
                                            "cuisine" : {
                                                    "$eq" : "American"
                                            }
                                    }
                            ]
                    },
                    "winningPlan" : {
                            "stage" : "FETCH",
                            "filter" : {
                                    "borough" : {
                                            "$eq" : "Staten Island"
                                    }
                            },
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "keyPattern" : {
                                            "cuisine" : 1
                                    },
                                    "indexName" : "cuisine_1",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "cuisine" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : true,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "cuisine" : [
                                                    "[\"American\", \"American\"]"
                                            ]
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "executionStats" : {
                    "executionSuccess" : true,
                    "nReturned" : 244,
                    "executionTimeMillis" : 1,
                    "totalKeysExamined" : 244,
                    "totalDocsExamined" : 244,
                    "executionStages" : {
                            "stage" : "FETCH",
                            "filter" : {
                                    "borough" : {
                                            "$eq" : "Staten Island"
                                    }
                            },
                            "nReturned" : 244,
                            "executionTimeMillisEstimate" : 0,
                            "works" : 245,
                            "advanced" : 244,
                            "needTime" : 0,
                            "needYield" : 0,
                            "saveState" : 1,
                            "restoreState" : 1,
                            "isEOF" : 1,
                            "invalidates" : 0,
                            "docsExamined" : 244,
                            "alreadyHasObj" : 0,
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "nReturned" : 244,
                                    "executionTimeMillisEstimate" : 0,
                                    "works" : 245,
                                    "advanced" : 244,
                                    "needTime" : 0,
                                    "needYield" : 0,
                                    "saveState" : 1,
                                    "restoreState" : 1,
                                    "isEOF" : 1,
                                    "invalidates" : 0,
                                    "keyPattern" : {
                                            "cuisine" : 1
                                    },
                                    "indexName" : "cuisine_1",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "cuisine" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : true,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "cuisine" : [
                                                    "[\"American\", \"American\"]"
                                            ]
                                    },
                                    "keysExamined" : 244,
                                    "seeks" : 1,
                                    "dupsTested" : 0,
                                    "dupsDropped" : 0,
                                    "seenInvalidated" : 0
                            }
                    }
            },
            "serverInfo" : {
                    "host" : "EPINHYDW0185",
                    "port" : 27017,
                    "version" : "4.0.9",
                    "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
            },
            "ok" : 1
    }

5. Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered 
( What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id. )
###### Query: 
    db.restaurants.createIndex({ 'grades.8.score': 1, 'name': 1}, { partialFilterExpression: { 'grades.8.score': { $lt: 7 }}});

###### Result:
    {
            "numIndexesBefore" : 5,
            "numIndexesAfter" : 5,
            "note" : "all indexes already exist",
            "ok" : 1
    }

    db.restaurants.find({ "grades.8.score" :{ $lt : 7 }},{_id:0, name:1}).explain();
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "grades.8.score" : {
                                "$lt" : 7
                        }
                },
                "winningPlan" : {
                        "stage" : "PROJECTION",
                        "transformBy" : {
                                "_id" : 0,
                                "name" : 1
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "grades.8.score" : 1,
                                        "name" : 1
                                },
                                "indexName" : "grades.8.score_1_name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "grades.8.score" : [ ],
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : true,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "grades.8.score" : [
                                                "[-inf.0, 7.0)"
                                        ],
                                        "name" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "EPINHYDW0185",
                "port" : 27017,
                "version" : "4.0.9",
                "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
        },
        "ok" : 1
}
    

MongoDB Task2

1) How many records does each airline class have? Use $project to show result as { class: "Z", total: 999 }

###### Query:
db.airlines.aggregate([
    {
        $group: { _id: "$class", total: { $sum: 1 } }
    },
    {
        $project: { class: "$_id", total: "$total", _id: 0 }
    }
])
###### Result:
{ "class" : "F", "total" : 140343 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "G", "total" : 17499 }

2) What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as { "avgPassengers": 2312.380, "city": "Minsk, Belarus" }

###### Query:
db.airlines.aggregate([
    {
        $match: { destCountry: { $ne: "United States" } }
    },
    {
        $group: { _id: "$destCity", highAvg: { $avg: "$passengers" } }
    },
    {
        $project: { count: "$highAvg", _id: 0, city: "$_id" }
    },
    { $sort: { count: -1 } },
    { $limit: 3 }
])

###### Result:
{ "count" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "count" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "count" : 7103.333333333333, "city" : "Guangzhou, China" }


3) Which carriers provide flights to Latvia (destCountry) ? Show result as one document { "_id" : "Latvia", "carriers" : ["carrier1", " carrier2", …] }

###### Query:
db.airlines.aggregate([
    {
        $match: { destCountry: { $eq: "Latvia" } }
    },
    {
        $group: {
            _id: "$destCountry",
            carrier: { $addToSet: "$carrier" }
        }
    }
])

###### Result:
{ "_id" : "Latvia", "carrier" : ["Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG"] }

4) What are the carriers which flue the most number of passengers from the United State to either
Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the
first 3). Show result as { "_id": "<carrier>", "total": 999 }

###### Query:

    db.airlines.aggregate([
    {
        $match:{'originCountry': { $eq: 'United States' },'destCountry': {$in:[ 'Greece','Italy','Spain']}}
    },
    {
        $group:{'_id': '$carrier','passengers': { $sum: '$passengers' }} 
    },
    {
        $project:{_id:'$_id',totalCount: '$passengers'}
    },
    {
        $sort:{totalCount: -1}
    },
    {
        $limit: 10
    },
    {
        $skip: 3
    }
    ])

###### Result:

{ "_id" : "Compagnia Aerea Italiana", "totalCount" : 280256 }
{ "_id" : "United Air Lines Inc.", "totalCount" : 229936 }
{ "_id" : "Emirates", "totalCount" : 100903 }
{ "_id" : "Air Europa", "totalCount" : 94968 }
{ "_id" : "Meridiana S.p.A", "totalCount" : 20308 }
{ "_id" : "Norwegian Air Shuttle ASA", "totalCount" : 13344 }
{ "_id" : "VistaJet Limited", "totalCount" : 183 }

5) Find the city (originCity) with the highest sum of passengers for each state (originState)
of the United States (originCountry). Provide the city for the first 5 states ordered by state
alphabetically (you should see the city for Alaska, Arizona and etc). Show result as 
{
"totalPassengers" : 999, 
"location" : { "state" : "abc", "city" : "xyz"
} }

###### Query:
db.airlines.aggregate([
    {   
        $match:{
            'originCountry': {$eq: "United States"}
        }
    },
    {
        $group: {
            _id: {
                    orgcity: "$originCity", 
                    orgstate: "$originState"
                    },
            'sumOfPassengers' : {$sum : "$passengers"}
        }         
    },     
    {
        $group: {
                '_id': '$_id.orgstate', 
                'location': { $mergeObjects: '$_id'},
                totalPassengers : {$max: "$sumOfPassengers"}
        }       
    },
    {
        $project:{
            _id:0,
            totalPassengers: 1,
            state: '$location.orgstate',
            city: '$location.orgcity' 
        }
    },
    {
        $sort:{
            'state': 1
        }
    },
    {
        $limit: 5
    }
]) 

###### Result:

{ "totalPassengers" : 760120, "state" : "Alabama", "city" : "Birmingham, AL" }
{ "totalPassengers" : 1472404, "state" : "Alaska", "city" : "Anchorage, AK" }
{ "totalPassengers" : 13152753, "state" : "Arizona", "city" : "Tucson, AZ" }
{ "totalPassengers" : 571452, "state" : "Arkansas", "city" : "El Dorado, AR" }
{ "totalPassengers" : 23701556, "state" : "California", "city" : "Fresno, CA" }


###### Aggregate Enron Collection
 db.enron.aggregate([
    {
         $unwind: "$headers.To"
     },
     {
         $group: {
             _id: {
                 id: "$_id",
                 from: "$headers.From"
             },
             ToList: { $addToSet: "$headers.To" }
         }
     },
     {
         $unwind: "$ToList"
     },
     {
         $group: {
             _id: {
                 sender: "$_id.from",
                 recipient: "$ToList"
             },
             count: { $sum: 1 }
         }
     },
     {
         $sort: {
             count: -1
         }
     },
     {
         $limit: 1
     }
 ])
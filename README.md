# cheganti.github.io
## MongoDB Task3:

### Query and Results:

1) How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?

	db.restaurants.find({cuisine: "Chinese", borough: "Queens"}).count();
  
	728
  
  
2) What is the _id of the restaurants which has the grade with the highest ever score?

   #### Qury: db.restaurants.find({},{ _id: 1}).sort({"grades.score": -1}).limit(1);
   #### Result: { "_id" : ObjectId("5ccaab62eb13dff33977843a") }
    
3) Add a grade { grade: “A”, score: 7, date: ISODate() } every restaurant in “Manhattan” (borough)

	#### Query: db.restaurants.updateMany({ borough: "Manhattan" },{$push: {grades: { grade: "A", score: 7, date: ISODate()  }}});
	#### Result: { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
  
4) What are the names of the restaurants which have a grade at index 8 with score less than 7? Use projection to include only names without _id.

	#### Query: db.restaurants.find({ "grades.8.score" :{ $lt : 7 }},{_id:0, name:1});
	#### Result: 
	{ "name" : "Silver Krust West Indian Restaurant" }
	{ "name" : "Pure Food" }

5) What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period
from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

	#### Query: db.restaurants.find({cuisine: { $eq: "Seafood" },"grades":{$elemMatch:{grade: "B",date: {$gte: ISODate("2014-02-01"),$lte: ISODate("2014-03-01")}}}},{ _id:1, borough:1 });
	#### Result:
	{ "_id" : ObjectId("5ccaab63eb13dff33977b845"), "borough" : "Bronx" }
	{ "_id" : ObjectId("5ccaab63eb13dff33977babf"), "borough" : "Manhattan" }
	
	#### Create the following indexes:
	
	1) Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan:
	
	db.restaurants.find({ name: "Glorious Food" })
	
	db.restaurants.createIndex({"name": 1}) => "indexName" : "name_1",
	
	2) Drop index from task 4.1
	
	db.restaurants.dropIndex({"name": 1 })
	
	{ "nIndexesWas" : 4, "ok" : 1 }
	
	3) Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is
	indeed covered:
	
	db.restaurants.createIndex({"restaurant_id": 41098650})
	{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 3,
        "numIndexesAfter" : 4,
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
                "rejectedPlans" : [
                        {
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
                                                        "restaurant_id" : 1
                                                },
                                                "indexName" : "restaurant_id_1",
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
                        }
                ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 1,
                "executionTimeMillis" : 16,
                "totalKeysExamined" : 1,
                "totalDocsExamined" : 1,
                "executionStages" : {
                        "stage" : "PROJECTION",
                        "nReturned" : 1,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 3,
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
                                "works" : 3,
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
                "host" : "EPINHYDW0185",
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
	
	db.restaurants.createIndex( { cuisine: 1 },{ partialFilterExpression: { borough: { $eq:  "Staten Island" } } })
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
                "executionTimeMillis" : 0,
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
	
	db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain("executionStats")
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
                                        "name" : {
                                                "$eq" : "Bagel Land"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Staten Island"
                                                }
                                        },
                                        {
                                                "name" : {
                                                        "$eq" : "Bagel Land"
                                                }
                                        }
                                ]
                        },
                        "direction" : "forward"
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 1,
                "executionTimeMillis" : 10,
                "totalKeysExamined" : 0,
                "totalDocsExamined" : 25359,
                "executionStages" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Staten Island"
                                                }
                                        },
                                        {
                                                "name" : {
                                                        "$eq" : "Bagel Land"
                                                }
                                        }
                                ]
                        },
                        "nReturned" : 1,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 25361,
                        "advanced" : 1,
                        "needTime" : 25359,
                        "needYield" : 0,
                        "saveState" : 198,
                        "restoreState" : 198,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "direction" : "forward",
                        "docsExamined" : 25359
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
	
	db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain("executionStats")
	{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "borough" : {
                                                "$eq" : "Queens"
                                        }
                                },
                                {
                                        "cuisine" : {
                                                "$eq" : "Pizza"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Queens"
                                                }
                                        },
                                        {
                                                "cuisine" : {
                                                        "$eq" : "Pizza"
                                                }
                                        }
                                ]
                        },
                        "direction" : "forward"
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 277,
                "executionTimeMillis" : 11,
                "totalKeysExamined" : 0,
                "totalDocsExamined" : 25359,
                "executionStages" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Queens"
                                                }
                                        },
                                        {
                                                "cuisine" : {
                                                        "$eq" : "Pizza"
                                                }
                                        }
                                ]
                        },
                        "nReturned" : 277,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 25361,
                        "advanced" : 277,
                        "needTime" : 25083,
                        "needYield" : 0,
                        "saveState" : 198,
                        "restoreState" : 198,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "direction" : "forward",
                        "docsExamined" : 25359
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

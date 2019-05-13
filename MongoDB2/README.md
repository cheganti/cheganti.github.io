1) How many records does each airline class have? Use $project to show result as { class: "Z", total: 999 }

#### Query:
db.airlines.aggregate([
    {
        $group: { _id: "$class", total: { $sum: 1 } }
    },
    {
        $project: { class: "$_id", total: "$total", _id: 0 }
    }
])
#### Result:
{ "class" : "F", "total" : 140343 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "G", "total" : 17499 }

2) What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as { "avgPassengers": 2312.380, "city": "Minsk, Belarus" }

#### Query:
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

#### Result:
{ "count" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "count" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "count" : 7103.333333333333, "city" : "Guangzhou, China" }


3) Which carriers provide flights to Latvia (destCountry) ? Show result as one document { "_id" : "Latvia", "carriers" : ["carrier1", " carrier2", …] }

#### Query:
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

#### Result:
{ "_id" : "Latvia", "carrier" : ["Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG"] }

4) What are the carriers which flue the most number of passengers from the United State to either
Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the
first 3). Show result as { "_id": "<carrier>", "total": 999 }

#### Query:

db.airlines.aggregate([
    {
        $match: {
            "$and": [{
                "$or": [
                    { "destCountry": "Greece" },
                    { "destCountry": "Italy" },
                    { "destCountry": "Spain" }
                ]
            },{"originCountry":"United States"}]   
        }
    }
])

#### Result:




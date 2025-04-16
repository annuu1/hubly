// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("test");

// db.getCollection("events").find({title: "Event"});
// db.getCollection("events").find({_id: new ObjectId('"67e29390d5966bfbb7392491"')});
use("test");
let collection = db.getCollection("events")

collection.find({})
// collection.countDocuments({})
// collection = db.getCollection("events")
// collection = db.getCollection("users")
// collection.find({}, {days:1});


// collection.find({}, {dateTime:1})

// collection.aggregate([
//     {
//       $project: {
//         days: {
//           Mon: "$days.Mon"
//         }
//       }
//     }
//   ]);



collection.deleteMany({});

// db.getCollection("events").deleteOne({_id: new ObjectId("67e2d0cfb93db50d06470750")});

// db.getCollection("events").find({id: "67e29390d5966bfbb7392491"});